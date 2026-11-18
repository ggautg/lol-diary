<script setup>
/**
 * Alta de una passkey nueva.
 * Sugiere un nombre a partir del navegador y del sistema operativo y deja
 * que el usuario lo cambie antes de registrarla.
 */
import { usePasskeyRegister } from '@laravel/passkeys/vue';
import { ref } from 'vue';

const emit = defineEmits(['success']);

const getDefaultPasskeyName = () => {
    const ua = navigator.userAgent;

    const browser = [
        { pattern: /Edg|Edge/, name: 'Edge' },
        { pattern: /OPR|Opera|OPiOS/, name: 'Opera' },
        { pattern: /Firefox|FxiOS/, name: 'Firefox' },
        { pattern: /Chrome|CriOS/, name: 'Chrome' },
        { pattern: /Safari/, name: 'Safari' },
    ].find(({ pattern }) => pattern.test(ua))?.name;

    const os = [
        { pattern: /iPhone/, name: 'iPhone' },
        { pattern: /iPad|Macintosh(?=.*Mobile)/, name: 'iPad' },
        { pattern: /Android/, name: 'Android' },
        { pattern: /Mac/, name: 'Mac' },
        { pattern: /Windows/, name: 'Windows' },
    ].find(({ pattern }) => pattern.test(ua))?.name;

    return [browser, os].filter(Boolean).join(' en ') || '';
};

const name = ref(getDefaultPasskeyName());
const showForm = ref(false);

const { register, isLoading, error, isSupported } = usePasskeyRegister({
    onSuccess: () => {
        name.value = '';
        showForm.value = false;
        emit('success');
    },
});

const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.value.trim()) {
        return;
    }

    await register(name.value);
};

const handleCancel = () => {
    showForm.value = false;
    name.value = '';
};
</script>

<template>
    <p v-if="!isSupported" class="lol-muted">
        Este navegador no admite passkeys.
    </p>

    <button
        v-else-if="!showForm"
        type="button"
        class="lol-btn"
        @click="showForm = true"
    >
        Añadir passkey
    </button>

    <form v-else class="lol-form lol-panel" @submit="handleSubmit">
        <div class="lol-field">
            <label class="lol-label" for="passkey-name">Nombre</label>
            <input
                id="passkey-name"
                v-model="name"
                v-focus
                type="text"
                class="lol-input"
                placeholder="Ej.: MacBook Pro, iPhone"
            />
            <p class="lol-hint">
                Un nombre te ayuda a reconocer esta passkey más adelante.
            </p>
        </div>

        <p v-if="error" class="lol-error">{{ error }}</p>

        <div class="lol-actions">
            <button
                type="submit"
                class="lol-btn-primary lol-btn-inline"
                :disabled="isLoading || !name.trim()"
            >
                {{ isLoading ? 'Registrando...' : 'Registrar passkey' }}
            </button>
            <button type="button" class="lol-btn" @click="handleCancel">
                Cancelar
            </button>
        </div>
    </form>
</template>
