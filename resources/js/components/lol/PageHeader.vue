<script setup>
/**
 * Cabecera reutilizable de cada pantalla: título y descripción corta.
 * Permite añadir acciones a la derecha con el slot `actions`.
 */
defineProps({
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
});
</script>

<template>
    <header class="lol-page-header">
        <div>
            <h1 class="lol-page-title">{{ title }}</h1>
            <p v-if="subtitle" class="lol-page-sub">{{ subtitle }}</p>
        </div>

        <div v-if="$slots.actions" class="lol-page-actions">
            <slot name="actions" />
        </div>
    </header>
</template>
