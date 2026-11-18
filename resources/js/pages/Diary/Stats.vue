<script setup>
/**
 * Panel de estadísticas: resumen, winrate por hora, por ánimo,
 * por campeón y por etiqueta.
 * El filtro de cuenta se refleja en la URL para poder compartirla.
 */
import { Head, router } from '@inertiajs/vue3';
import { computed, ref, watch } from 'vue';
import ChampionIcon from '@/components/ChampionIcon.vue';
import AccountFilter from '@/components/lol/AccountFilter.vue';
import ChampionTable from '@/components/lol/ChampionTable.vue';
import PageHeader from '@/components/lol/PageHeader.vue';
import StatStrip from '@/components/lol/StatStrip.vue';
import WinrateBar from '@/components/WinrateBar.vue';
import DiaryLayout from '@/layouts/DiaryLayout.vue';
import { moodLabel } from '@/lib/lol';

defineOptions({ layout: DiaryLayout });

const props = defineProps({
    accounts: { type: Array, required: true },
    selectedAccount: { type: Number, default: null },
    stats: { type: Object, required: true },
});

// Por debajo de esta muestra un porcentaje es casi ruido.
const MIN_GAMES = 3;

const selected = computed({
    get: () => props.selectedAccount,
    set: (value) => {
        router.get(
            '/diary/stats',
            value === null ? {} : { account: value },
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
            },
        );
    },
});

function formatHour(hour) {
    return `${String(hour).padStart(2, '0')}:00`;
}

/* ---------- Resumen ---------- */
const overview = computed(() => [
    { label: 'Partidas', value: props.stats.overview.games },
    { label: 'Victorias', value: props.stats.overview.wins, tone: 'win' },
    { label: 'Derrotas', value: props.stats.overview.losses, tone: 'loss' },
]);

const bestHour = computed(
    () =>
        props.stats.hours
            .filter((hour) => hour.games >= MIN_GAMES)
            .sort((a, b) => b.winrate - a.winrate || b.games - a.games)[0] ??
        null,
);

const mostPlayed = computed(() => props.stats.champions[0] ?? null);

const bestChampion = computed(
    () =>
        props.stats.champions
            .filter((champion) => champion.games >= MIN_GAMES)
            .sort((a, b) => b.winrate - a.winrate || b.games - a.games)[0] ??
        null,
);

/* ---------- Gráfico por hora ---------- */
// Siempre 24 columnas, incluso para horas sin partidas.
const hourBars = computed(() => {
    const byHour = new Map(props.stats.hours.map((hour) => [hour.hour, hour]));

    return Array.from(
        { length: 24 },
        (_, hour) =>
            byHour.get(hour) ?? {
                hour,
                games: 0,
                wins: 0,
                losses: 0,
                winrate: 0,
            },
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
</script>

<template>
    <Head title="Estadísticas" />

    <div class="lol-container">
        <PageHeader
            title="Estadísticas"
            subtitle="Qué campeones, horas y estados de ánimo te funcionan mejor."
        >
            <template #actions>
                <AccountFilter
                    v-model="selected"
                    :accounts="accounts"
                />
            </template>
        </PageHeader>

        <p v-if="stats.overview.games === 0" class="lol-panel text-sm">
            Todavía no hay partidas para mostrar. Importa algunas desde la
            sección Partidas.
        </p>

        <template v-else>
            <!-- Resumen -->
            <section>
                <h2 class="lol-section-title">Resumen</h2>

                <div class="lol-panel lol-overview lol-rise">
                    <div
                        class="lol-ring"
                        :style="{ '--pct': stats.overview.winrate }"
                        role="img"
                        :aria-label="`Winrate ${stats.overview.winrate}%`"
                    >
                        <span class="lol-ring-value"
                            >{{ stats.overview.winrate }}%</span
                        >
                    </div>

                    <div class="lol-overview-body">
                        <StatStrip :stats="overview" />

                        <div class="lol-stats">
                            <div class="lol-stat">
                                <p class="lol-stat-label">Mejor hora</p>
                                <p
                                    v-if="bestHour"
                                    class="lol-stat-value lol-stat-value--sm"
                                >
                                    {{ formatHour(bestHour.hour) }}
                                    <span class="lol-muted"
                                        >{{ bestHour.winrate }}% ·
                                        {{ bestHour.games }} partidas</span
                                    >
                                </p>
                                <p v-else class="lol-muted">
                                    Faltan datos (3+ partidas en una hora)
                                </p>
                            </div>

                            <div class="lol-stat">
                                <p class="lol-stat-label">Más jugado</p>
                                <div
                                    v-if="mostPlayed"
                                    class="lol-champ-cell"
                                >
                                    <ChampionIcon
                                        :champion="mostPlayed.champion"
                                        :size="26"
                                    />
                                    <p
                                        class="lol-stat-value lol-stat-value--sm"
                                    >
                                        {{ mostPlayed.champion }}
                                        <span class="lol-muted"
                                            >{{ mostPlayed.games }}
                                            partidas</span
                                        >
                                    </p>
                                </div>
                            </div>

                            <div class="lol-stat">
                                <p class="lol-stat-label">Mejor winrate</p>
                                <div
                                    v-if="bestChampion"
                                    class="lol-champ-cell"
                                >
                                    <ChampionIcon
                                        :champion="bestChampion.champion"
                                        :size="26"
                                    />
                                    <p
                                        class="lol-stat-value lol-stat-value--sm"
                                    >
                                        {{ bestChampion.champion }}
                                        <span class="lol-muted"
                                            >{{ bestChampion.winrate }}% ·
                                            {{ bestChampion.games }}
                                            partidas</span
                                        >
                                    </p>
                                </div>
                                <p v-else class="lol-muted">
                                    Faltan datos (3+ partidas con un campeón)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Por hora -->
            <section>
                <h2 class="lol-section-title">Winrate por hora del día</h2>

                <div class="lol-panel lol-rise">
                    <p class="lol-muted mb-3">
                        Hora local. La línea dorada marca el 50 %. Las columnas
                        tenues tienen menos de {{ MIN_GAMES }} partidas: no son
                        confiables.
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
                                    :class="{
                                        'is-faint': bar.games < MIN_GAMES,
                                    }"
                                    :data-side="
                                        bar.winrate >= 50 ? 'win' : 'loss'
                                    "
                                    :style="{
                                        height: Math.max(bar.winrate, 3) + '%',
                                    }"
                                />
                            </span>
                            <span class="lol-hour-label">{{ bar.hour }}</span>
                            <span class="lol-hour-count">{{
                                bar.games || ''
                            }}</span>
                        </button>
                    </div>

                    <p class="lol-muted mt-3" aria-live="polite">
                        {{ hourReadout }}
                    </p>
                </div>
            </section>

            <!-- Por ánimo -->
            <section>
                <h2 class="lol-section-title">Winrate por estado de ánimo</h2>

                <div class="lol-panel lol-rise">
                    <p class="lol-muted mb-4">
                        Solo cuenta las partidas donde anotaste un ánimo.
                    </p>

                    <p v-if="stats.moods.length === 0" class="text-sm">
                        Aún no hay partidas con ánimo anotado. Ponlo al anotar
                        tus partidas en el calendario.
                    </p>

                    <div v-else class="lol-bar-rows">
                        <div
                            v-for="mood in stats.moods"
                            :key="mood.mood"
                            class="lol-bar-row"
                            :data-mood="mood.mood"
                        >
                            <span class="lol-bar-row-label">
                                <span class="lol-dot" />
                                {{ moodLabel(mood.mood) }}
                            </span>
                            <WinrateBar
                                :winrate="mood.winrate"
                                :games="mood.games"
                                :min-games="MIN_GAMES"
                            />
                            <span class="lol-bar-row-value">
                                {{ mood.winrate }}%
                                <span class="lol-muted"
                                    >({{ mood.games }})</span
                                >
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Campeones -->
            <section>
                <h2 class="lol-section-title">Campeones</h2>

                <ChampionTable
                    :champions="stats.champions"
                    :min-games="MIN_GAMES"
                />
            </section>

            <!-- Etiquetas -->
            <section>
                <h2 class="lol-section-title">
                    Tus etiquetas más repetidas
                </h2>

                <div class="lol-panel lol-rise">
                    <p class="lol-muted mb-4">
                        Solo cuenta las partidas donde anotaste esa etiqueta.
                    </p>

                    <p v-if="stats.tags.length === 0" class="text-sm">
                        Aún no hay etiquetas. Añádelas al anotar tus partidas en
                        el calendario.
                    </p>

                    <div v-else class="lol-bar-rows">
                        <div
                            v-for="tag in stats.tags"
                            :key="tag.name"
                            class="lol-bar-row"
                        >
                            <span class="lol-bar-row-label">
                                <span class="lol-tag">#{{ tag.name }}</span>
                            </span>
                            <WinrateBar
                                :winrate="tag.winrate"
                                :games="tag.games"
                                :min-games="MIN_GAMES"
                            />
                            <span class="lol-bar-row-value">
                                {{ tag.winrate }}%
                                <span class="lol-muted">({{ tag.games }})</span>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </template>
    </div>
</template>
