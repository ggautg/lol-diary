<script setup>
/**
 * Aviso de verificación de correo: reenvía el enlace o cierra la sesión.
 */
import { Form, Head, Link } from '@inertiajs/vue3';
import LolAuthLayout from '@/layouts/LolAuthLayout.vue';
import { logout } from '@/routes';
import { send } from '@/routes/verification';

defineOptions({ layout: LolAuthLayout });

defineProps({
    status: { type: String, default: undefined },
});
</script>

<template>
    <Head title="Verifica tu correo" />

    <p class="lol-auth-subtitle">Verifica tu correo</p>

    <p class="mt-5 text-center text-sm">
        Te enviamos un enlace de verificación. Ábrelo para activar tu cuenta.
    </p>

    <p
        v-if="status === 'verification-link-sent'"
        class="lol-notice mt-5"
        role="status"
    >
        Te enviamos un enlace nuevo al correo con el que te registraste.
    </p>

    <Form
        v-bind="send.form()"
        class="mt-6 space-y-5 text-center"
        v-slot="{ processing }"
    >
        <button
            type="submit"
            class="lol-btn-primary"
            :disabled="processing"
        >
            {{ processing ? 'Enviando...' : 'Reenviar enlace' }}
        </button>

        <Link :href="logout()" method="post" as="button" class="lol-link block text-sm">
            Cerrar sesión
        </Link>
    </Form>
</template>
