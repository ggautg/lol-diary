<script setup>
/**
 * Botones para elegir el estado de ánimo de una partida.
 * Se comporta como un grupo de opciones: pulsar el activo lo deselecciona.
 */
import { MOODS } from '@/lib/lol';

defineProps({
    modelValue: { type: String, default: null },
});

defineEmits(['update:modelValue']);
</script>

<template>
    <div class="lol-mood-group">
        <button
            v-for="mood in MOODS"
            :key="mood.value"
            type="button"
            class="lol-mood"
            :data-mood="mood.value"
            :aria-pressed="modelValue === mood.value"
            @click="
                $emit(
                    'update:modelValue',
                    modelValue === mood.value ? null : mood.value,
                )
            "
        >
            {{ mood.label }}
        </button>
    </div>
</template>
