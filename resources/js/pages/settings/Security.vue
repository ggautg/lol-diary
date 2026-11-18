<script setup>
/**
 * Ajustes de seguridad: cambio de contraseña, verificación en dos pasos
 * y passkeys. Cada bloque se oculta si la función no está disponible.
 */
import { Form, Head } from '@inertiajs/vue3';
import SecurityController from '@/actions/App/Http/Controllers/Settings/SecurityController';
import ManagePasskeys from '@/components/ManagePasskeys.vue';
import ManageTwoFactor from '@/components/ManageTwoFactor.vue';

const props = defineProps({
    passwordRules: { type: String, required: true },
    canManagePasskeys: { type: Boolean, default: false },
    passkeys: { type: Array, default: () => [] },
    canManageTwoFactor: { type: Boolean, default: false },
    requiresConfirmation: { type: Boolean, default: false },
    twoFactorEnabled: { type: Boolean, default: false },
});
</script>

<template>
    <Head title="Seguridad" />

    <div class="lol-settings-section">
        <h2 class="lol-settings-heading">Cambiar contraseña</h2>
        <p class="lol-muted">
            Usa una contraseña larga y difícil de adivinar para mantener la
            cuenta segura.
        </p>

        <Form
            v-bind="SecurityController.update.form()"
            :options="{ preserveScroll: true }"
            reset-on-success
            :reset-on-error="[
                'password',
                'password_confirmation',
                'current_password',
            ]"
            class="lol-form"
            v-slot="{ errors, processing }"
        >
            <div class="lol-field">
                <label class="lol-label" for="current_password">
                    Contraseña actual
                </label>
                <input
                    id="current_password"
                    name="current_password"
                    type="password"
                    class="lol-input"
                    autocomplete="current-password"
                    placeholder="Tu contraseña actual"
                />
                <p v-if="errors.current_password" class="lol-error">
                    {{ errors.current_password }}
                </p>
            </div>

            <div class="lol-field">
                <label class="lol-label" for="password">Contraseña nueva</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    class="lol-input"
                    autocomplete="new-password"
                    placeholder="Nueva contraseña"
                    :passwordrules="props.passwordRules"
                />
                <p v-if="errors.password" class="lol-error">
                    {{ errors.password }}
                </p>
            </div>

            <div class="lol-field">
                <label class="lol-label" for="password_confirmation">
                    Repite la contraseña nueva
                </label>
                <input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    class="lol-input"
                    autocomplete="new-password"
                    placeholder="Repite la contraseña"
                    :passwordrules="props.passwordRules"
                />
                <p v-if="errors.password_confirmation" class="lol-error">
                    {{ errors.password_confirmation }}
                </p>
            </div>

            <div class="lol-actions">
                <button
                    type="submit"
                    class="lol-btn-primary lol-btn-inline"
                    :disabled="processing"
                    data-test="update-password-button"
                >
                    {{ processing ? 'Guardando...' : 'Guardar contraseña' }}
                </button>
            </div>
        </Form>
    </div>

    <ManageTwoFactor
        :can-manage-two-factor="canManageTwoFactor"
        :requires-confirmation="requiresConfirmation"
        :two-factor-enabled="twoFactorEnabled"
    />

    <ManagePasskeys
        :can-manage-passkeys="canManagePasskeys"
        :passkeys="passkeys"
    />
</template>
