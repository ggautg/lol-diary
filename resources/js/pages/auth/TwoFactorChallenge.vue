<script setup>
/**
 * Segundo paso del inicio de sesión: código de la app de autenticación
 * o uno de los códigos de recuperación.
 */
import { Form, Head } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import LolAuthLayout from '@/layouts/LolAuthLayout.vue';
import { store } from '@/routes/two-factor/login';

defineOptions({ layout: LolAuthLayout });

const showRecoveryInput = ref(false);
const code = ref('');

const content = computed(() =>
    showRecoveryInput.value
        ? {
              title: 'Código de recuperación',
              description:
                  'Escribe uno de los códigos de emergencia que guardaste al activar la verificación en dos pasos.',
              toggle: 'usar el código de la aplicación',
          }
        : {
              title: 'Código de verificación',
              description:
                  'Escribe el código de 6 dígitos que muestra tu aplicación de autenticación.',
              toggle: 'usar un código de recuperación',
          },
);

const toggleRecoveryMode = (clearErrors) => {
    showRecoveryInput.value = !showRecoveryInput.value;
    clearErrors();
    code.value = '';
};
</script>

<template>
    <Head title="Verificación en dos pasos" />

    <p class="lol-auth-subtitle">{{ content.title }}</p>

    <p class="mt-5 text-center text-sm">{{ content.description }}</p>

    <Form
        v-if="!showRecoveryInput"
        v-bind="store.form()"
        class="mt-6 space-y-5"
        reset-on-error
        @error="code = ''"
        #default="{ errors, processing, clearErrors }"
    >
        <input type="hidden" name="code" :value="code" />

        <div class="flex flex-col items-center gap-3">
            <InputOTP
                id="otp"
                v-model="code"
                :maxlength="6"
                :disabled="processing"
                autofocus
            >
                <InputOTPGroup>
                    <InputOTPSlot
                        v-for="index in 6"
                        :key="index"
                        :index="index - 1"
                    />
                </InputOTPGroup>
            </InputOTP>
            <p v-if="errors.code" class="lol-error">{{ errors.code }}</p>
        </div>

        <button
            type="submit"
            class="lol-btn-primary"
            :disabled="processing || code.length < 6"
        >
            {{ processing ? 'Verificando...' : 'Continuar' }}
        </button>

        <p class="text-center text-sm">
            O bien
            <button
                type="button"
                class="lol-link"
                @click="toggleRecoveryMode(clearErrors)"
            >
                {{ content.toggle }}
            </button>
        </p>
    </Form>

    <Form
        v-else
        v-bind="store.form()"
        class="mt-6 space-y-5"
        reset-on-error
        #default="{ errors, processing, clearErrors }"
    >
        <div class="lol-field">
            <label class="lol-label" for="recovery_code">
                Código de recuperación
            </label>
            <input
                id="recovery_code"
                name="recovery_code"
                v-focus
                type="text"
                class="lol-input"
                placeholder="Escribe el código"
                required
            />
            <p v-if="errors.recovery_code" class="lol-error">
                {{ errors.recovery_code }}
            </p>
        </div>

        <button
            type="submit"
            class="lol-btn-primary"
            :disabled="processing"
        >
            {{ processing ? 'Verificando...' : 'Continuar' }}
        </button>

        <p class="text-center text-sm">
            O bien
            <button
                type="button"
                class="lol-link"
                @click="toggleRecoveryMode(clearErrors)"
            >
                {{ content.toggle }}
            </button>
        </p>
    </Form>
</template>
