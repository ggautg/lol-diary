<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import { computed, ref } from 'vue';

const props = withDefaults(
    defineProps<{
        champion: string;
        size?: number;
    }>(),
    { size: 32 },
);

const page = usePage();
const failed = ref(false);

const version = computed(() => page.props.ddragonVersion as string | null | undefined);

const src = computed(() =>
    version.value && !failed.value
        ? `https://ddragon.leagueoflegends.com/cdn/${version.value}/img/champion/${props.champion}.png`
        : null,
);
</script>

<template>
    <span class="lol-champ-icon" :style="{ width: `${size}px`, height: `${size}px` }">
        <img v-if="src" :src="src" alt="" loading="lazy" @error="failed = true" />
        <span v-else aria-hidden="true">{{ champion.charAt(0) }}</span>
    </span>
</template>