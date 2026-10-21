<script setup>
import { Head, router } from '@inertiajs/vue3';
import { computed, ref, watch } from 'vue';
import ChampionIcon from '@/components/ChampionIcon.vue';
import WinrateBar from '@/components/WinrateBar.vue';
import DiaryLayout from '@/layouts/DiaryLayout.vue';

defineOptions({ layout: DiaryLayout });

const props = defineProps({
    accounts: { type: Array, required: true },
    selectedAccount: { type: Number, default: null },
    stats: { type: Object, required: true },
});

// Below this many games a percentage is mostly noise
const MIN_GAMES = 3;

const MOOD_LABELS = {
    focused: 'Concentrado',
    calm: 'Tranquilo',
    hyped: 'Motivado',
    tired: 'Cansado',
    tilted: 'Tilteado',
};

const selected = ref(props.selectedAccount);

watch(selected, (value) => {
    router.get(
        '/diary/stats',
        value === null ? {} : { account: value },
        { preserveScroll: true, preserveState: true, replace: true },
    );
});

function formatHour(hour) {
    return `${String(hour).padStart(2, '0')}:00`;
}

/* ---------- Highlights ---------- */
const bestHour = computed(
    () =>
        props.stats.hours
            .filter((h) => h.games >= MIN_GAMES)
            .sort((a, b) => b.winrate - a.winrate || b.games - a.games)[0] ?? null,
);

const mostPlayed = computed(() => props.stats.champions[0] ?? null);

const bestChampion = computed(
    () =>
        props.stats.champions
            .filter((c) => c.games >= MIN_GAMES)
            .sort((a, b) => b.winrate - a.winrate || b.games - a.games)[0] ?? null,
);

/* ---------- Hour chart ---------- */
// Always 24 columns, even for hours with no games
const hourBars = computed(() => {
    const byHour = new Map(props.stats.hours.map((h) => [h.hour, h]));

    return Array.from(
        { length: 24 },
        (_, hour) => byHour.get(hour) ?? { hour, games: 0, wins: 0, losses: 0, winrate: 0 },
    );
});

const selectedHour = ref(null);

function toggleHour(hour) {
    selectedHour.value = selectedHour.value === hour ? null : hour;
}

function hourLabel(bar) {
    return bar.games === 0
        ? `${formatHour(bar.hour)}: sin partidas`
        : `${formatHour(bar.hour)}: ${bar.winrate}% de winrate, ${bar.wins} victorias y ${bar.losses} derrotas`;
}

const hourReadout = computed(() => {
    if (selectedHour.value === null) {
        return 'Toca una columna para ver el detalle. El número de abajo son las partidas jugadas.';
    }

    const bar = hourBars.value[selectedHour.value];

    return bar.games === 0
        ? `${formatHour(bar.hour)}: sin partidas.`
        : `${formatHour(bar.hour)}: ${bar.winrate}% · ${bar.wins}V ${bar.losses}D (${bar.games} partidas)`;
});

/* ---------- Champions table ---------- */
const onlyReliable = ref(false);
const showAllChampions = ref(false);

const champions = computed(() => {
    const list = onlyReliable.value
        ? props.stats.champions.filter((c) => c.games >= MIN_GAMES)
        : props.stats.champions;

    return showAllChampions.value ? list : list.slice(0, 10);
});
</script>

<template>
    <Head title="Estadísticas" />

    <div class="lol-container">
        <div class="lol-toolbar">
            <header>
                <h1 class="lol-page-title">Estadísticas</h1>
                <p class="lol-page-sub">Qué campeones, horas y estados de ánimo te funcionan mejor.</p>
            </header>

            <select v-model="selected" class="lol-select" aria-label="Filtrar por cuenta">
                <option :value="null">Todas las cuentas</option>
                <option v-for="account in accounts" :key="account.id" :value="account.id">
                    {{ account.label }}
                </option>
            </select>
        </div>

        <div v-if="stats.overview.games === 0" class="lol-panel text-sm">
            Todavía no hay partidas para mostrar. Importa algunas desde la sección Partidas.
        </div>

        <template v-else>
            <!-- Overview -->
            <section>
                <h2 class="lol-section-title">Resumen</h2>

                <div class="lol-panel lol-overview lol-rise">
                    <div
                        class="lol-ring"
                        :style="{ '--pct': stats.overview.winrate }"
                        role="img"
                        :aria-label="`Winrate ${stats.overview.winrate}%`"
                    >
                        <span class="lol-ring-value">{{ stats.overview.winrate }}%</span>
                    </div>

                    <div class="lol-overview-body">
                        <div class="lol-stats">
                            <div class="lol-stat">
                                <p class="lol-stat-label">Partidas</p>
                                <p class="lol-stat-value">{{ stats.overview.games }}</p>
                            </div>
                            <div class="lol-stat">
                                <p class="lol-stat-label">Victorias</p>
                                <p class="lol-stat-value lol-win-text">{{ stats.overview.wins }}</p>
                            </div>
                            <div class="lol-stat">
                                <p class="lol-stat-label">Derrotas</p>
                                <p class="lol-stat-value lol-loss-text">{{ stats.overview.losses }}</p>
                            </div>
                        </div>

                        <div class="lol-stats">
                            <div class="lol-stat">
                                <p class="lol-stat-label">Mejor hora</p>
                                <p v-if="bestHour" class="lol-stat-value lol-stat-value--sm">
                                    {{ formatHour(bestHour.hour) }}
                                    <span class="lol-muted">{{ bestHour.winrate }}% · {{ bestHour.games }} partidas</span>
                                </p>
                                <p v-else class="lol-muted">Faltan datos (3+ partidas en una hora)</p>
                            </div>

                            <div class="lol-stat">
                                <p class="lol-stat-label">Más jugado</p>
                                <div v-if="mostPlayed" class="lol-champ-cell">
                                    <ChampionIcon :champion="mostPlayed.champion" :size="26" />
                                    <p class="lol-stat-value lol-stat-value--sm">
                                        {{ mostPlayed.champion }}
                                        <span class="lol-muted">{{ mostPlayed.games }} partidas</span>
                                    </p>
                                </div>
                            </div>

                            <div class="lol-stat">
                                <p class="lol-stat-label">Mejor winrate</p>
                                <div v-if="bestChampion" class="lol-champ-cell">
                                    <ChampionIcon :champion="bestChampion.champion" :size="26" />
                                    <p class="lol-stat-value lol-stat-value--sm">
                                        {{ bestChampion.champion }}
                                        <span class="lol-muted">{{ bestChampion.winrate }}% · {{ bestChampion.games }} partidas</span>
                                    </p>
                                </div>
                                <p v-else class="lol-muted">Faltan datos (3+ partidas con un campeón)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- By hour -->
            <section>
                <h2 class="lol-section-title">Winrate por hora del día</h2>

                <div class="lol-panel lol-rise">
                    <p class="lol-muted mb-3">
                        Hora local. La línea dorada marca el 50 %. Las columnas tenues tienen menos de
                        {{ MIN_GAMES }} partidas: no son confiables.
                    </p>

                    <div class="lol-hours">
                        <button
                            v-for="bar in hourBars"
                            :key="bar.hour"
                            type="button"
                            class="lol-hour"
                            :aria-label="hourLabel(bar)"
                            :aria-pressed="selectedHour === bar.hour"
                            @click="toggleHour(bar.hour)"
                        >
                            <span class="lol-hour-track">
                                <span
                                    v-if="bar.games > 0"
                                    class="lol-hour-fill"
                                    :class="{ 'is-faint': bar.games < MIN_GAMES }"
                                    :data-side="bar.winrate >= 50 ? 'win' : 'loss'"
                                    :style="{ height: Math.max(bar.winrate, 3) + '%' }"
                                />
                            </span>
                            <span class="lol-hour-label">{{ bar.hour }}</span>
                            <span class="lol-hour-count">{{ bar.games || '' }}</span>
                        </button>
                    </div>

                    <p class="lol-muted mt-3" aria-live="polite">{{ hourReadout }}</p>
                </div>
            </section>

            <!-- By mood -->
            <section>
                <h2 class="lol-section-title">Winrate por estado de ánimo</h2>

                <div class="lol-panel lol-rise">
                    <p class="lol-muted mb-4">Solo cuenta las partidas donde anotaste un ánimo.</p>

                    <p v-if="stats.moods.length === 0" class="text-sm">
                        Aún no hay partidas con ánimo anotado. Ponlo al anotar tus partidas en el calendario.
                    </p>

                    <div v-else class="lol-bar-rows">
                        <div v-for="mood in stats.moods" :key="mood.mood" class="lol-bar-row" :data-mood="mood.mood">
                            <span class="lol-bar-row-label">
                                <span class="lol-dot" />
                                {{ MOOD_LABELS[mood.mood] ?? mood.mood }}
                            </span>
                            <WinrateBar :winrate="mood.winrate" :games="mood.games" :min-games="MIN_GAMES" />
                            <span class="lol-bar-row-value">
                                {{ mood.winrate }}% <span class="lol-muted">({{ mood.games }})</span>
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Champions -->
            <section>
                <h2 class="lol-section-title">Campeones</h2>

                <div class="lol-panel lol-rise !p-2">
                    <div class="px-3 pt-2 pb-1">
                        <label class="lol-check">
                            <input v-model="onlyReliable" type="checkbox" />
                            Solo con {{ MIN_GAMES }}+ partidas
                        </label>
                    </div>

                    <div class="lol-table-wrap">
                        <table class="lol-table">
                            <thead>
                                <tr>
                                    <th>Campeón</th>
                                    <th>Partidas</th>
                                    <th>V / D</th>
                                    <th>Winrate</th>
                                    <th>KDA</th>
                                    <th>Daño prom.</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="row in champions"
                                    :key="row.champion"
                                    :data-result="row.winrate >= 50 ? 'win' : 'loss'"
                                >
                                    <td>
                                        <div class="lol-champ-cell">
                                            <ChampionIcon :champion="row.champion" :size="30" />
                                            <span class="lol-strong">{{ row.champion }}</span>
                                        </div>
                                    </td>
                                    <td class="lol-num">{{ row.games }}</td>
                                    <td class="lol-num">{{ row.wins }} / {{ row.losses }}</td>
                                    <td>
                                        <div class="lol-wr-cell">
                                            <span
                                                class="lol-num lol-strong"
                                                :class="row.winrate >= 50 ? 'lol-win-text' : 'lol-loss-text'"
                                            >
                                                {{ row.winrate }}%
                                            </span>
                                            <WinrateBar :winrate="row.winrate" :games="row.games" :min-games="MIN_GAMES" />
                                        </div>
                                    </td>
                                    <td class="lol-num">{{ row.kda }}</td>
                                    <td class="lol-num">{{ row.avg_damage.toLocaleString('es-PY') }}</td>
                                </tr>
                                <tr v-if="champions.length === 0">
                                    <td colspan="6">Ningún campeón cumple el filtro.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div v-if="!showAllChampions && stats.champions.length > 10" class="px-3 py-2">
                        <button type="button" class="lol-btn" @click="showAllChampions = true">
                            Mostrar todos ({{ stats.champions.length }})
                        </button>
                    </div>
                </div>
            </section>

            <!-- Tags -->
            <section>
                <h2 class="lol-section-title">Tus etiquetas más repetidas</h2>

                <div class="lol-panel lol-rise">
                    <p class="lol-muted mb-4">Solo cuenta las partidas donde anotaste esa etiqueta.</p>

                    <p v-if="stats.tags.length === 0" class="text-sm">
                        Aún no hay etiquetas. Añádelas al anotar tus partidas en el calendario.
                    </p>

                    <div v-else class="lol-bar-rows">
                        <div v-for="tag in stats.tags" :key="tag.name" class="lol-bar-row">
                            <span class="lol-bar-row-label">
                                <span class="lol-tag">#{{ tag.name }}</span>
                            </span>
                            <WinrateBar :winrate="tag.winrate" :games="tag.games" :min-games="MIN_GAMES" />
                            <span class="lol-bar-row-value">
                                {{ tag.winrate }}% <span class="lol-muted">({{ tag.games }})</span>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </template>
    </div>
</template>