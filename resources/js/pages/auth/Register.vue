<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import LolAuthLayout from '@/layouts/LolAuthLayout.vue';

defineOptions({ layout: LolAuthLayout });

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

function submit() {
    form.post('/register', {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
}
</script>

<template>
    <Head title="Crear cuenta" />

    <p class="lol-auth-subtitle">Crea tu cuenta</p>

    <form class="mt-6 space-y-5" @submit.prevent="submit">
        <div class="lol-field">
            <label class="lol-label" for="name">Nombre</label>
            <input
                id="name"
                v-model="form.name"
                type="text"
                class="lol-input"
                autocomplete="name"
                autofocus
                required
                placeholder="Tu nombre"
            />
            <p v-if="form.errors.name" class="lol-error">{{ form.errors.name }}</p>
        </div>

        <div class="lol-field">
            <label class="lol-label" for="email">Email</label>
            <input
                id="email"
                v-model="form.email"
                type="email"
                class="lol-input"
                autocomplete="email"
                required
                placeholder="tu@email.com"
            />
            <p v-if="form.errors.email" class="lol-error">{{ form.errors.email }}</p>
        </div>

        <div class="lol-field">
            <label class="lol-label" for="password">Contraseña</label>
            <input
                id="password"
                v-model="form.password"
                type="password"
                class="lol-input"
                autocomplete="new-password"
                required
            />
            <p v-if="form.errors.password" class="lol-error">{{ form.errors.password }}</p>
        </div>

        <div class="lol-field">
            <label class="lol-label" for="password_confirmation">Repite la contraseña</label>
            <input
                id="password_confirmation"
                v-model="form.password_confirmation"
                type="password"
                class="lol-input"
                autocomplete="new-password"
                required
            />
            <p v-if="form.errors.password_confirmation" class="lol-error">
                {{ form.errors.password_confirmation }}
            </p>
        </div>

        <button type="submit" class="lol-btn-primary" :disabled="form.processing">
            {{ form.processing ? 'Creando cuenta...' : 'Crear cuenta' }}
        </button>
    </form>

    <p class="mt-6 text-center text-sm">
        ¿Ya tienes cuenta?
        <Link href="/login" class="lol-link">Inicia sesión</Link>
    </p>
</template>