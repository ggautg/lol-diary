<script setup>
/**
 * Confirmación de contraseña para las zonas sensibles de la cuenta.
 * También permite confirmar con una passkey si el navegador la admite.
 */
import { Form, Head } from '@inertiajs/vue3';
import PasskeyVerify from '@/components/PasskeyVerify.vue';
import LolAuthLayout from '@/layouts/LolAuthLayout.vue';
import {
    index as confirmOptions,
    store as confirmStore,
} from '@/actions/Laravel/Passkeys/Http/Controllers/PasskeyConfirmationController';
import { store } from '@/routes/password/confirm';

defineOptions({ layout: LolAuthLayout });
</script>

<template>
    <Head title="Confirmar contraseña" />

    <p class="lol-auth-subtitle">Confirma tu contraseña</p>

    <p class="mt-5 text-center text-sm">
        Esta es una zona segura de la aplicación. Confirma tu contraseña para
        continuar.
    </p>

    <div class="mt-6">
        <PasskeyVerify
            :routes="{
                options: confirmOptions(),
                submit: confirmStore(),
            }"
            label="Confirmar con passkey"
            loading-label="Confirmando..."
            separator="O confirma con tu contraseña"
        />
    </div>

    <Form
        v-bind="store.form()"
        reset-on-success
        class="space-y-5"
        v-slot="{ errors, processing }"
    >
        <div class="lol-field">
            <label class="lol-label" for="password">Contraseña</label>
            <input
                id="password"
                name="password"
                type="password"
                class="lol-input"
                required
                autocomplete="current-password"
                autofocus
                placeholder="Tu contraseña"
            />
            <p v-if="errors.password" class="lol-error">
                {{ errors.password }}
            </p>
        </div>

        <button
            type="submit"
            class="lol-btn-primary"
            :disabled="processing"
            data-test="confirm-password-button"
        >
            {{ processing ? 'Confirmando...' : 'Confirmar contraseña' }}
        </button>
    </Form>
</template>
