<script setup>
/**
 * Aviso de error reutilizable: muestra una lista de mensajes sin repetirlos.
 */
import { AlertCircle } from '@lucide/vue';
import { computed } from 'vue';

const props = defineProps({
    errors: { type: Array, required: true },
    title: { type: String, default: 'Algo salió mal.' },
});

const uniqueErrors = computed(() => Array.from(new Set(props.errors)));
</script>

<template>
    <div class="lol-notice lol-notice--error" role="alert">
        <p class="flex items-center gap-2 font-semibold">
            <AlertCircle class="size-4" />
            {{ title }}
        </p>
        <ul class="mt-1 list-inside list-disc text-sm">
            <li v-for="(error, index) in uniqueErrors" :key="index">
                {{ error }}
            </li>
        </ul>
    </div>
</template>
