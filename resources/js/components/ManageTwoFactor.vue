<script setup>
/**
 * Bloque de verificación en dos pasos (2FA) de los ajustes de seguridad.
 * Permite activarla, continuar una configuración pendiente y desactivarla.
 */
import { Form } from '@inertiajs/vue3';
import { ShieldCheck } from '@lucide/vue';
import { onUnmounted, ref } from 'vue';
import TwoFactorRecoveryCodes from '@/components/TwoFactorRecoveryCodes.vue';
import TwoFactorSetupModal from '@/components/TwoFactorSetupModal.vue';
import { useTwoFactorAuth } from '@/composables/useTwoFactorAuth';
import { disable, enable } from '@/routes/two-factor';

defineProps({
    canManageTwoFactor: { type: Boolean, default: false },
    requiresConfirmation: { type: Boolean, default: false },
    twoFactorEnabled: { type: Boolean, default: false },
});

const { hasSetupData, clearTwoFactorAuthData } = useTwoFactorAuth();
const showSetupModal = ref(false);

onUnmounted(() => clearTwoFactorAuthData());
</script>

<template>
    <div v-if="canManageTwoFactor" class="lol-settings-section">
        <h2 class="lol-settings-heading">Verificación en dos pasos</h2>
        <p class="lol-muted">
            Añade un código temporal además de la contraseña para proteger la
            cuenta.
        </p>

        <div v-if="!twoFactorEnabled" class="lol-form">
            <p>
                Al activarla, se te pedirá un código de una aplicación de
                autenticación (Google Authenticator, Authy, etc.) cada vez que
                inicies sesión.
            </p>

            <div class="lol-actions">
                <button
                    v-if="hasSetupData"
                    type="button"
                    class="lol-btn-primary lol-btn-inline"
                    @click="showSetupModal = true"
                >
                    <ShieldCheck :size="14" />
                    Continuar configuración
                </button>

                <Form
                    v-else
                    v-bind="enable.form()"
                    class="lol-actions"
                    @success="showSetupModal = true"
                    v-slot="{ processing }"
                >
                    <button
                        type="submit"
                        class="lol-btn-primary lol-btn-inline"
                        :disabled="processing"
                    >
                        {{ processing ? 'Activando...' : 'Activar 2FA' }}
                    </button>
                </Form>
            </div>
        </div>

        <div v-else class="lol-form">
            <p>
                La verificación en dos pasos está activa. Al iniciar sesión se
                te pedirá el código de tu aplicación de autenticación.
            </p>

            <div class="lol-actions">
                <Form v-bind="disable.form()" v-slot="{ processing }">
                    <button
                        type="submit"
                        class="lol-btn lol-btn--danger"
                        :disabled="processing"
                    >
                        {{ processing ? 'Desactivando...' : 'Desactivar 2FA' }}
                    </button>
                </Form>
            </div>

            <TwoFactorRecoveryCodes />
        </div>

        <TwoFactorSetupModal
            v-model:is-open="showSetupModal"
            :requires-confirmation="requiresConfirmation"
            :two-factor-enabled="twoFactorEnabled"
        />
    </div>
</template>
