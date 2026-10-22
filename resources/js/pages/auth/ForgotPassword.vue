<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import LolAuthLayout from '@/layouts/LolAuthLayout.vue';

defineOptions({ layout: LolAuthLayout });

defineProps({
    status: { type: String, default: undefined },
});

const form = useForm({
    email: '',
});

function submit() {
    form.post('/forgot-password');
}
</script>

<template>
    <Head title="Recuperar contraseña" />

    <p class="lol-auth-subtitle">Recupera tu contraseña</p>

    <p class="mt-5 text-center text-sm">
        Escribe tu email y te enviaremos un enlace para crear una contraseña
        nueva.
    </p>

    <p v-if="status" class="lol-notice mt-5">{{ status }}</p>

    <form class="mt-6 space-y-5" @submit.prevent="submit">
        <div class="lol-field">
            <label class="lol-label" for="email">Email</label>
            <input
                id="email"
                v-model="form.email"
                type="email"
                class="lol-input"
                autocomplete="email"
                autofocus
                required
                placeholder="tu@email.com"
            />
            <p v-if="form.errors.email" class="lol-error">
                {{ form.errors.email }}
            </p>
        </div>

        <button
            type="submit"
            class="lol-btn-primary"
            :disabled="form.processing"
        >
            {{ form.processing ? 'Enviando...' : 'Enviar enlace' }}
        </button>
    </form>

    <p class="mt-6 text-center text-sm">
        <Link href="/login" class="lol-link">Volver a iniciar sesión</Link>
    </p>
</template>
