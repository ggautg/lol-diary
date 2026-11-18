<script setup>
/**
 * Mensajes de éxito y error de una acción.
 * Se usa en todas las pantallas para que el feedback sea idéntico.
 */
defineProps({
    success: { type: String, default: null },
    error: { type: String, default: null },
});
</script>

<template>
    <p v-if="success" class="lol-notice" role="status">{{ success }}</p>
    <p v-if="error" class="lol-notice lol-notice--error" role="alert">
        {{ error }}
    </p>
</template>
