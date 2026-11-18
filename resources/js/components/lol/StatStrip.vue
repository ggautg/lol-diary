<script setup>
/**
 * Fila de métricas resumidas.
 * Cada elemento acepta `{ label, value, tone }`, donde `tone` puede ser
 * "win" o "loss" para colorear el valor.
 */
defineProps({
    stats: { type: Array, required: true },
});
</script>

<template>
    <div class="lol-stats">
        <div v-for="stat in stats" :key="stat.label" class="lol-stat">
            <p class="lol-stat-label">{{ stat.label }}</p>
            <p
                class="lol-stat-value"
                :class="{
                    'lol-win-text': stat.tone === 'win',
                    'lol-loss-text': stat.tone === 'loss',
                    'lol-stat-value--sm': stat.small,
                }"
            >
                {{ stat.value }}
            </p>
        </div>
    </div>
</template>
