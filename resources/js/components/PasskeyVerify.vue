<script setup>
/**
 * Botón para confirmar la contraseña con una passkey.
 * Si el navegador no la admite no se muestra nada: queda el formulario.
 */
import { router } from '@inertiajs/vue3';
import { usePasskeyVerify } from '@laravel/passkeys/vue';
import { KeyRound } from '@lucide/vue';

const props = defineProps({
    routes: { type: Object, default: null },
    label: { type: String, default: 'Entrar con una passkey' },
    loadingLabel: { type: String, default: 'Autenticando...' },
    separator: { type: String, default: 'O continúa con tu contraseña' },
});

const { verify, isLoading, error, isSupported } = usePasskeyVerify({
    ...(props.routes
        ? {
              routes: {
                  options: props.routes.options.url,
                  submit: props.routes.submit.url,
              },
          }
        : {}),
    onSuccess: (response) => {
        router.visit(response.redirect ?? '/diary');
    },
});
</script>

<template>
    <div v-if="isSupported">
        <button
            type="button"
            class="lol-btn-primary"
            :disabled="isLoading"
            @click="verify"
        >
            <KeyRound v-if="!isLoading" class="h-4 w-4" />
            {{ isLoading ? loadingLabel : label }}
        </button>

        <p v-if="error" class="lol-error mt-2 text-center">{{ error }}</p>

        <div class="my-5 flex items-center gap-3" aria-hidden="true">
            <span class="h-px flex-1 bg-[var(--lol-border-dim)]" />
            <span class="text-xs uppercase tracking-wider opacity-70">
                {{ separator }}
            </span>
            <span class="h-px flex-1 bg-[var(--lol-border-dim)]" />
        </div>
    </div>
</template>
