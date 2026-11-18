<script setup>
/**
 * Formulario para crear una contraseña nueva desde el enlace del correo.
 * El token y el correo viajan ocultos en el envío.
 */
import { Form, Head } from '@inertiajs/vue3';
import { ref } from 'vue';
import LolAuthLayout from '@/layouts/LolAuthLayout.vue';
import { update } from '@/routes/password';

defineOptions({ layout: LolAuthLayout });

const props = defineProps({
    token: { type: String, required: true },
    email: { type: String, required: true },
    passwordRules: { type: String, required: true },
});

const inputEmail = ref(props.email);
</script>

<template>
    <Head title="Nueva contraseña" />

    <p class="lol-auth-subtitle">Nueva contraseña</p>

    <p class="mt-5 text-center text-sm">
        Elige una contraseña nueva para tu cuenta.
    </p>

    <Form
        v-bind="update.form()"
        :transform="(data) => ({ ...data, token, email })"
        :reset-on-success="['password', 'password_confirmation']"
        class="mt-6 space-y-5"
        v-slot="{ errors, processing }"
    >
        <div class="lol-field">
            <label class="lol-label" for="email">Correo electrónico</label>
            <input
                id="email"
                v-model="inputEmail"
                type="email"
                name="email"
                class="lol-input"
                autocomplete="email"
                readonly
            />
            <p v-if="errors.email" class="lol-error">{{ errors.email }}</p>
        </div>

        <div class="lol-field">
            <label class="lol-label" for="password">Contraseña nueva</label>
            <input
                id="password"
                name="password"
                type="password"
                class="lol-input"
                autocomplete="new-password"
                autofocus
                required
                placeholder="Nueva contraseña"
                :passwordrules="passwordRules"
            />
            <p v-if="errors.password" class="lol-error">
                {{ errors.password }}
            </p>
        </div>

        <div class="lol-field">
            <label class="lol-label" for="password_confirmation">
                Repite la contraseña
            </label>
            <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                class="lol-input"
                autocomplete="new-password"
                required
                placeholder="Repite la contraseña"
                :passwordrules="passwordRules"
            />
            <p v-if="errors.password_confirmation" class="lol-error">
                {{ errors.password_confirmation }}
            </p>
        </div>

        <button
            type="submit"
            class="lol-btn-primary"
            :disabled="processing"
            data-test="reset-password-button"
        >
            {{ processing ? 'Guardando...' : 'Guardar contraseña' }}
        </button>
    </Form>
</template>
