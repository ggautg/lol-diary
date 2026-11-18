<script setup>
/**
 * Códigos de recuperación de la verificación en dos pasos.
 * Se pueden ocultar, mostrar y regenerar; cada código sirve una sola vez.
 */
import { Form } from '@inertiajs/vue3';
import { Eye, EyeOff, LockKeyhole, RefreshCw } from '@lucide/vue';
import { nextTick, onMounted, ref, useTemplateRef } from 'vue';
import AlertError from '@/components/AlertError.vue';
import { useTwoFactorAuth } from '@/composables/useTwoFactorAuth';
import { regenerateRecoveryCodes } from '@/routes/two-factor';

const { recoveryCodesList, fetchRecoveryCodes, errors } = useTwoFactorAuth();
const isRecoveryCodesVisible = ref(false);
const recoveryCodeSectionRef = useTemplateRef('recoveryCodeSectionRef');

const toggleRecoveryCodesVisibility = async () => {
    if (!isRecoveryCodesVisible.value && !recoveryCodesList.value.length) {
        await fetchRecoveryCodes();
    }

    isRecoveryCodesVisible.value = !isRecoveryCodesVisible.value;

    if (isRecoveryCodesVisible.value) {
        await nextTick();
        recoveryCodeSectionRef.value?.scrollIntoView({ behavior: 'smooth' });
    }
};

onMounted(async () => {
    if (!recoveryCodesList.value.length) {
        await fetchRecoveryCodes();
    }
});
</script>

<template>
    <div class="lol-panel">
        <p class="flex items-center gap-2 font-semibold text-[var(--lol-text-bright)]">
            <LockKeyhole class="size-4" />
            Códigos de recuperación
        </p>
        <p class="lol-muted mt-1">
            Sirven para recuperar el acceso si pierdes el dispositivo de 2FA.
            Guárdalos en un gestor de contraseñas seguro.
        </p>

        <div class="lol-actions mt-3">
            <button
                type="button"
                class="lol-btn"
                @click="toggleRecoveryCodesVisibility"
            >
                <component
                    :is="isRecoveryCodesVisible ? EyeOff : Eye"
                    class="size-4"
                />
                {{
                    isRecoveryCodesVisible
                        ? 'Ocultar códigos'
                        : 'Ver códigos de recuperación'
                }}
            </button>

            <Form
                v-if="isRecoveryCodesVisible && recoveryCodesList.length"
                v-bind="regenerateRecoveryCodes.form()"
                method="post"
                :options="{ preserveScroll: true }"
                @success="fetchRecoveryCodes"
                #default="{ processing }"
            >
                <button
                    type="submit"
                    class="lol-btn"
                    :disabled="processing"
                >
                    <RefreshCw class="size-4" />
                    {{ processing ? 'Regenerando...' : 'Regenerar códigos' }}
                </button>
            </Form>
        </div>

        <div
            :class="[
                'overflow-hidden transition-all duration-300',
                isRecoveryCodesVisible
                    ? 'mt-3 h-auto opacity-100'
                    : 'h-0 opacity-0',
            ]"
        >
            <AlertError v-if="errors?.length" :errors="errors" />

            <div v-else class="space-y-3">
                <div
                    ref="recoveryCodeSectionRef"
                    class="grid gap-1 border border-[var(--lol-border-dim)] bg-[rgb(var(--lol-navy-rgb)/0.5)] p-4 font-mono text-sm"
                >
                    <div v-if="!recoveryCodesList.length" class="space-y-2">
                        <div
                            v-for="n in 8"
                            :key="n"
                            class="h-4 animate-pulse bg-[rgb(var(--lol-text-rgb)/0.15)]"
                        />
                    </div>
                    <div
                        v-else
                        v-for="(code, index) in recoveryCodesList"
                        :key="index"
                    >
                        {{ code }}
                    </div>
                </div>
                <p class="lol-muted select-none">
                    Cada código se puede usar una sola vez y se elimina después.
                    Si necesitas más, pulsa «Regenerar códigos».
                </p>
            </div>
        </div>
    </div>
</template>
