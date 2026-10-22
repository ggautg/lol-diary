<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import LolAuthLayout from '@/layouts/LolAuthLayout.vue';

defineOptions({ layout: LolAuthLayout });

// Without a default, an absent Boolean prop would be false and hide both links
defineProps({
    status: { type: String, default: undefined },
    canResetPassword: { type: Boolean, default: true },
    canRegister: { type: Boolean, default: true },
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

function submit() {
    form.post('/login', {
        onFinish: () => form.reset('password'),
    });
}
</script>

<template>
    <Head title="Iniciar sesión" />

    <p class="lol-auth-subtitle">Inicia sesión</p>

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

        <div class="lol-field">
            <div class="flex items-center justify-between">
                <label class="lol-label" for="password">Contraseña</label>
                <Link
                    v-if="canResetPassword"
                    href="/forgot-password"
                    class="lol-link mb-1 text-xs"
                >
                    ¿Olvidaste tu contraseña?
                </Link>
            </div>
            <input
                id="password"
                v-model="form.password"
                type="password"
                class="lol-input"
                autocomplete="current-password"
                required
            />
            <p v-if="form.errors.password" class="lol-error">
                {{ form.errors.password }}
            </p>
        </div>

        <label class="flex items-center gap-2 text-sm">
            <input v-model="form.remember" type="checkbox" />
            Recordarme
        </label>

        <button
            type="submit"
            class="lol-btn-primary"
            :disabled="form.processing"
        >
            {{ form.processing ? 'Entrando...' : 'Entrar' }}
        </button>
    </form>

    <p v-if="canRegister" class="mt-6 text-center text-sm">
        ¿No tienes cuenta?
        <Link href="/register" class="lol-link">Regístrate</Link>
    </p>
</template>
