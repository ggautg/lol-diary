<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';

// Data Dragon ids are case sensitive and can differ from in-game names
// (e.g. K'Sante => "KSante", Wukong => "MonkeyKing")
const champions = [
    { id: 'Diana', name: 'Diana' },
    { id: 'Sivir', name: 'Sivir' },
    { id: 'Ashe', name: 'Ashe' },
    { id: 'Karma', name: 'Karma' },
    { id: 'Seraphine', name: 'Seraphine' },
    { id: 'Maokai', name: 'Maokai' },
];

const INTERVAL_MS = 6000;

const failed = reactive(new Set());
const index = ref(0);
let timer;

// A slide that fails to load (offline, typo in the id) is skipped
const slides = computed(() => champions.filter((champion) => !failed.has(champion.id)));
const current = computed(() => index.value % Math.max(slides.value.length, 1));

const splashUrl = (id) =>
    `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`;

function go(next) {
    index.value = next;
    restart();
}

function advance() {
    index.value = (current.value + 1) % Math.max(slides.value.length, 1);
}

function restart() {
    stop();
    timer = setInterval(advance, INTERVAL_MS);
}

function stop() {
    if (timer !== undefined) {
        clearInterval(timer);
        timer = undefined;
    }
}

onMounted(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) {
        restart();
    }
});

onBeforeUnmount(stop);
</script>

<template>
    <div class="lol-auth">
        <div class="lol-auth-slides" aria-hidden="true">
            <img
                v-for="(champion, i) in slides"
                :key="champion.id"
                :src="splashUrl(champion.id)"
                :alt="champion.name"
                :fetchpriority="i === 0 ? 'high' : 'low'"
                class="lol-auth-slide"
                :class="{ 'is-active': i === current }"
                @error="failed.add(champion.id)"
            />
        </div>
        <div class="lol-auth-overlay" aria-hidden="true" />

        <div class="lol-auth-panel">
            <p class="lol-auth-brand">LoL Diary</p>
            <slot />
        </div>

        <p v-if="slides.length" class="lol-auth-caption" aria-hidden="true">
            {{ slides[current]?.name }}
        </p>

        <div v-if="slides.length > 1" class="lol-auth-dots">
            <button
                v-for="(champion, i) in slides"
                :key="champion.id"
                type="button"
                :class="{ 'is-active': i === current }"
                :aria-label="`Mostrar ${champion.name}`"
                @click="go(i)"
            />
        </div>
    </div>
</template>