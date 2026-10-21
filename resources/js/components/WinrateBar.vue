<script setup lang="ts">
withDefaults(
    defineProps<{
        winrate: number;
        games: number;
        minGames?: number;
    }>(),
    { minGames: 3 },
);
</script>

<template>
    <div
        class="lol-bar"
        :class="{ 'is-faint': games < minGames }"
        role="img"
        :aria-label="`Winrate ${winrate}% en ${games} partidas`"
    >
        <div
            class="lol-bar-fill"
            :data-side="winrate >= 50 ? 'win' : 'loss'"
            :style="{ width: Math.max(winrate, 2) + '%' }"
        />
    </div>
</template>