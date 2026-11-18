<script setup>
/**
 * Calendario mensual de partidas.
 * Muestra un resumen, la cuadrícula del mes y el detalle del día elegido.
 * Cada partida se anota en su propia tarjeta (ver MatchCard.vue).
 */
import { Head, Link, usePage } from '@inertiajs/vue3';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { computed, nextTick, ref, watch } from 'vue';
import ChampionIcon from '@/components/ChampionIcon.vue';
import AccountFilter from '@/components/lol/AccountFilter.vue';
import FlashNotice from '@/components/lol/FlashNotice.vue';
import MatchCard from '@/components/lol/MatchCard.vue';
import PageHeader from '@/components/lol/PageHeader.vue';
import StatStrip from '@/components/lol/StatStrip.vue';
import DiaryLayout from '@/layouts/DiaryLayout.vue';

defineOptions({ layout: DiaryLayout });

const props = defineProps({
    month: { type: String, required: true },
    prevMonth: { type: String, required: true },
    nextMonth: { type: String, required: true },
    accounts: { type: Array, required: true },
    matches: { type: Array, required: true },
    allTags: { type: Array, default: () => [] },
});

const weekdays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const MAX_TAGS = 10;

const page = usePage();
const successMessage = computed(() => page.props.flash?.success);

const selectedAccount = ref(null);
const selectedDate = ref(null);
const editingId = ref(null);
const detail = ref(null);

const filtered = computed(() =>
    props.matches.filter(
        (match) =>
            selectedAccount.value === null ||
            match.account_id === selectedAccount.value,
    ),
);

const byDate = computed(() => {
    const map = new Map();

    for (const match of filtered.value) {
        if (!map.has(match.date)) {
            map.set(match.date, []);
        }

        map.get(match.date).push(match);
    }

    return map;
});

function dayMatches(date) {
    return byDate.value.get(date) ?? [];
}

function dayResult(date) {
    const list = dayMatches(date);

    if (list.length === 0) {
        return 'none';
    }

    const wins = list.filter((match) => match.win).length;
    const losses = list.length - wins;

    return wins > losses ? 'win' : losses > wins ? 'loss' : 'mixed';
}

function dayLabel(cell) {
    const list = dayMatches(cell.date);

    if (list.length === 0) {
        return `Día ${cell.day}: sin partidas`;
    }

    const wins = list.filter((match) => match.win).length;

    return `Día ${cell.day}: ${list.length} partidas, ${wins} victorias, ${list.length - wins} derrotas`;
}

const monthLabel = computed(() => {
    const [year, month] = props.month.split('-').map(Number);

    return new Date(year, month - 1, 1).toLocaleDateString('es-PY', {
        month: 'long',
        year: 'numeric',
    });
});

const cells = computed(() => {
    const [year, month] = props.month.split('-').map(Number);
    const firstWeekday = (new Date(year, month - 1, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month, 0).getDate();

    const list = [];

    for (let i = 0; i < firstWeekday; i++) {
        list.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        list.push({
            day,
            date: `${props.month}-${String(day).padStart(2, '0')}`,
        });
    }

    return list;
});

const summary = computed(() => {
    const games = filtered.value.length;
    const wins = filtered.value.filter((match) => match.win).length;

    return [
        { label: 'Partidas', value: games },
        { label: 'Victorias', value: wins, tone: 'win' },
        { label: 'Derrotas', value: games - wins, tone: 'loss' },
        {
            label: 'Winrate',
            value: `${games === 0 ? 0 : Math.round((wins / games) * 100)}%`,
        },
    ];
});

const selectedMatches = computed(() =>
    selectedDate.value ? dayMatches(selectedDate.value) : [],
);

const now = new Date();
const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

function longDate(date) {
    const [year, month, day] = date.split('-').map(Number);
    const text = new Date(year, month - 1, day).toLocaleDateString('es-PY', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    });

    return text.charAt(0).toUpperCase() + text.slice(1);
}

// Inertia reutiliza el componente al cambiar de mes: limpiamos la selección.
watch(
    () => props.month,
    () => {
        selectedDate.value = null;
        editingId.value = null;
    },
);

// En pantallas pequeñas el detalle queda debajo: lo traemos a la vista.
watch(selectedDate, async (value) => {
    editingId.value = null;

    if (!value) {
        return;
    }

    await nextTick();

    const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
    ).matches;

    detail.value?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'nearest',
    });
});
</script>

<template>
    <Head title="Calendario" />

    <div class="lol-container">
        <PageHeader
            title="Calendario"
            subtitle="Tus partidas día a día y lo que aprendiste de cada una."
        />

        <FlashNotice :success="successMessage" />

        <div class="lol-toolbar">
            <div class="lol-month-nav">
                <Link
                    :href="`/diary/calendar?month=${prevMonth}`"
                    class="lol-icon-btn"
                    aria-label="Mes anterior"
                    preserve-scroll
                >
                    <ChevronLeft :size="18" />
                </Link>
                <h2 class="lol-month-label">{{ monthLabel }}</h2>
                <Link
                    :href="`/diary/calendar?month=${nextMonth}`"
                    class="lol-icon-btn"
                    aria-label="Mes siguiente"
                    preserve-scroll
                >
                    <ChevronRight :size="18" />
                </Link>
                <Link href="/diary/calendar" class="lol-btn" preserve-scroll>
                    Hoy
                </Link>
            </div>

            <AccountFilter
                v-model="selectedAccount"
                :accounts="accounts"
            />
        </div>

        <StatStrip :stats="summary" />

        <p v-if="filtered.length === 0" class="lol-muted">
            No hay partidas en este mes. Importa más desde la sección Partidas.
        </p>

        <div class="lol-cal">
            <div v-for="day in weekdays" :key="day" class="lol-cal-head">
                {{ day }}
            </div>

            <template v-for="(cell, index) in cells" :key="index">
                <div v-if="cell === null" aria-hidden="true" />
                <button
                    v-else
                    type="button"
                    class="lol-day"
                    :class="{
                        'is-today': cell.date === today,
                        'is-selected': selectedDate === cell.date,
                    }"
                    :data-result="dayResult(cell.date)"
                    :aria-label="dayLabel(cell)"
                    :aria-pressed="selectedDate === cell.date"
                    @click="selectedDate = cell.date"
                >
                    <span class="lol-day-num">{{ cell.day }}</span>

                    <span
                        v-if="dayMatches(cell.date).length"
                        class="lol-day-icons"
                    >
                        <span
                            v-for="match in dayMatches(cell.date).slice(0, 3)"
                            :key="match.id"
                            class="lol-day-icon"
                            :class="{ 'has-note': match.has_entry }"
                            :data-result="match.win ? 'win' : 'loss'"
                            :title="`${match.champion} · ${match.win ? 'Victoria' : 'Derrota'}`"
                        >
                            <ChampionIcon
                                :champion="match.champion"
                                :size="26"
                            />
                        </span>
                        <span
                            v-if="dayMatches(cell.date).length > 3"
                            class="lol-muted"
                        >
                            +{{ dayMatches(cell.date).length - 3 }}
                        </span>
                    </span>
                </button>
            </template>
        </div>

        <section v-if="selectedDate" ref="detail">
            <h2 class="lol-section-title">{{ longDate(selectedDate) }}</h2>

            <p v-if="selectedMatches.length === 0" class="lol-panel text-sm">
                No hay partidas este día.
            </p>

            <div v-else class="lol-match-list">
                <MatchCard
                    v-for="match in selectedMatches"
                    :key="match.id"
                    :match="match"
                    :editing="editingId === match.id"
                    :all-tags="allTags"
                    :max-tags="MAX_TAGS"
                    @edit="editingId = match.id"
                    @close="editingId = null"
                    @saved="editingId = null"
                />
            </div>
        </section>
    </div>
</template>
