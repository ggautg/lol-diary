<script setup>
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';
import { ChevronLeft, ChevronRight, Pencil, X } from 'lucide-vue-next';
import { computed, nextTick, ref, watch } from 'vue';
import ChampionIcon from '@/components/ChampionIcon.vue';
import DiaryLayout from '@/layouts/DiaryLayout.vue';
import { csPerMinute, formatDuration, kdaRatio, roleLabel } from '@/lib/lol';

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

const moods = [
    { value: 'focused', label: 'Concentrado' },
    { value: 'calm', label: 'Tranquilo' },
    { value: 'hyped', label: 'Motivado' },
    { value: 'tired', label: 'Cansado' },
    { value: 'tilted', label: 'Tilteado' },
];

function moodLabel(value) {
    return moods.find((m) => m.value === value)?.label ?? '';
}

const page = usePage();
const successMessage = computed(() => page.props.flash?.success);

const selectedAccount = ref(null);
const selectedDate = ref(null);
const detail = ref(null);

const filtered = computed(() =>
    props.matches.filter(
        (m) =>
            selectedAccount.value === null ||
            m.account_id === selectedAccount.value,
    ),
);

const byDate = computed(() => {
    const map = new Map();
    for (const match of filtered.value) {
        if (!map.has(match.date)) map.set(match.date, []);
        map.get(match.date).push(match);
    }
    return map;
});

function dayMatches(date) {
    return byDate.value.get(date) ?? [];
}

function dayResult(date) {
    const list = dayMatches(date);
    if (list.length === 0) return 'none';
    const wins = list.filter((m) => m.win).length;
    const losses = list.length - wins;
    return wins > losses ? 'win' : losses > wins ? 'loss' : 'mixed';
}

function dayLabel(cell) {
    const list = dayMatches(cell.date);
    if (list.length === 0) return `Día ${cell.day}: sin partidas`;
    const wins = list.filter((m) => m.win).length;
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
    const firstWeekday = (new Date(year, month - 1, 1).getDay() + 6) % 7; // Monday = 0
    const daysInMonth = new Date(year, month, 0).getDate();

    const list = [];
    for (let i = 0; i < firstWeekday; i++) list.push(null);
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
    const wins = filtered.value.filter((m) => m.win).length;
    return {
        games,
        wins,
        losses: games - wins,
        winrate: games === 0 ? 0 : Math.round((wins / games) * 100),
    };
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

/* ---------- Diary entry form ---------- */
const editingId = ref(null);
const tagInput = ref('');
const MAX_TAGS = 10;

const form = useForm({
    mood: null,
    notes: '',
    lesson: '',
    tags: [],
});

function toggleMood(value) {
    form.mood = form.mood === value ? null : value;
}

function addTag(raw = tagInput.value) {
    const name = raw.trim().toLowerCase();
    if (
        name !== '' &&
        !form.tags.includes(name) &&
        form.tags.length < MAX_TAGS
    ) {
        form.tags.push(name);
    }
    tagInput.value = '';
}

function removeTag(name) {
    form.tags = form.tags.filter((tag) => tag !== name);
}

const suggestions = computed(() =>
    props.allTags.filter((tag) => !form.tags.includes(tag)).slice(0, 12),
);

function startEditing(match) {
    form.clearErrors();
    form.mood = match.mood;
    form.notes = match.notes ?? '';
    form.lesson = match.lesson ?? '';
    form.tags = [...match.tags];
    tagInput.value = '';
    editingId.value = match.id;
}

function saveEntry(match) {
    addTag(); // keep a tag that was typed but never confirmed with Enter

    form.put(`/matches/${match.id}/diary-entry`, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => (editingId.value = null),
    });
}

// Inertia reuses this component when changing month, so reset the selection
watch(
    () => props.month,
    () => {
        selectedDate.value = null;
        editingId.value = null;
    },
);

// On small screens the detail sits below the grid: bring it into view
watch(selectedDate, async (value) => {
    editingId.value = null;

    if (value) {
        await nextTick();
        const reduceMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;
        detail.value?.scrollIntoView({
            behavior: reduceMotion ? 'auto' : 'smooth',
            block: 'nearest',
        });
    }
});
</script>

<template>
    <Head title="Calendario" />

    <div class="lol-container">
        <header>
            <h1 class="lol-page-title">Calendario</h1>
            <p class="lol-page-sub">
                Tus partidas día a día y lo que aprendiste de cada una.
            </p>
        </header>

        <p v-if="successMessage" class="lol-notice">{{ successMessage }}</p>

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
                <Link href="/diary/calendar" class="lol-btn" preserve-scroll
                    >Hoy</Link
                >
            </div>

            <select
                v-model="selectedAccount"
                class="lol-select"
                aria-label="Filtrar por cuenta"
            >
                <option :value="null">Todas las cuentas</option>
                <option
                    v-for="account in accounts"
                    :key="account.id"
                    :value="account.id"
                >
                    {{ account.label }}
                </option>
            </select>
        </div>

        <div class="lol-stats">
            <div class="lol-stat">
                <p class="lol-stat-label">Partidas</p>
                <p class="lol-stat-value">{{ summary.games }}</p>
            </div>
            <div class="lol-stat">
                <p class="lol-stat-label">Victorias / Derrotas</p>
                <p class="lol-stat-value">
                    <span class="lol-win-text">{{ summary.wins }}</span>
                    /
                    <span class="lol-loss-text">{{ summary.losses }}</span>
                </p>
            </div>
            <div class="lol-stat">
                <p class="lol-stat-label">Winrate</p>
                <p class="lol-stat-value">{{ summary.winrate }}%</p>
            </div>
        </div>

        <p v-if="summary.games === 0" class="lol-muted">
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

            <div v-if="selectedMatches.length === 0" class="lol-panel text-sm">
                No hay partidas este día.
            </div>

            <div v-else class="lol-match-list">
                <article
                    v-for="match in selectedMatches"
                    :key="match.id"
                    class="lol-panel lol-match"
                    :data-result="match.win ? 'win' : 'loss'"
                >
                    <div class="lol-match-row">
                        <div class="lol-champ-cell lol-match-champ">
                            <ChampionIcon
                                :champion="match.champion"
                                :size="44"
                            />
                            <div>
                                <p class="lol-strong">{{ match.champion }}</p>
                                <p class="lol-muted">
                                    {{ roleLabel(match.role) }} ·
                                    {{ match.account_label }} · {{ match.time }}
                                </p>
                            </div>
                        </div>

                        <div class="lol-match-stats">
                            <div>
                                <p class="lol-mini-label">KDA</p>
                                <p class="lol-mini-value">
                                    {{ match.kills }}/{{ match.deaths }}/{{
                                        match.assists
                                    }}
                                    <span class="lol-muted">{{
                                        kdaRatio(
                                            match.kills,
                                            match.deaths,
                                            match.assists,
                                        )
                                    }}</span>
                                </p>
                            </div>
                            <div>
                                <p class="lol-mini-label">Daño</p>
                                <p class="lol-mini-value">
                                    {{
                                        match.damage_dealt.toLocaleString(
                                            'es-PY',
                                        )
                                    }}
                                </p>
                            </div>
                            <div>
                                <p class="lol-mini-label">CS</p>
                                <p class="lol-mini-value">
                                    {{ match.cs }}
                                    <span class="lol-muted"
                                        >{{
                                            csPerMinute(
                                                match.cs,
                                                match.duration,
                                            )
                                        }}/m</span
                                    >
                                </p>
                            </div>
                            <div>
                                <p class="lol-mini-label">Duración</p>
                                <p class="lol-mini-value">
                                    {{ formatDuration(match.duration) }}
                                </p>
                            </div>
                        </div>

                        <span
                            class="lol-badge"
                            :class="
                                match.win ? 'lol-badge--win' : 'lol-badge--loss'
                            "
                        >
                            {{ match.win ? 'Victoria' : 'Derrota' }}
                        </span>

                        <button
                            type="button"
                            class="lol-btn"
                            @click="startEditing(match)"
                        >
                            <Pencil :size="14" />
                            {{ match.has_entry ? 'Editar' : 'Anotar' }}
                        </button>
                    </div>

                    <div
                        v-if="match.has_entry && editingId !== match.id"
                        class="lol-match-note"
                    >
                        <p v-if="match.mood">
                            <span class="lol-badge" :data-mood="match.mood">{{
                                moodLabel(match.mood)
                            }}</span>
                        </p>
                        <p v-if="match.notes" class="whitespace-pre-line">
                            <span class="lol-note-label">Notas</span
                            >{{ match.notes }}
                        </p>
                        <p v-if="match.lesson" class="whitespace-pre-line">
                            <span class="lol-note-label">Lección</span
                            >{{ match.lesson }}
                        </p>
                        <div v-if="match.tags.length" class="lol-tags">
                            <span
                                v-for="tag in match.tags"
                                :key="tag"
                                class="lol-tag"
                                >#{{ tag }}</span
                            >
                        </div>
                    </div>

                    <form
                        v-if="editingId === match.id"
                        class="lol-form"
                        @submit.prevent="saveEntry(match)"
                    >
                        <div>
                            <p class="lol-label">Estado de ánimo</p>
                            <div class="lol-mood-group">
                                <button
                                    v-for="m in moods"
                                    :key="m.value"
                                    type="button"
                                    class="lol-mood"
                                    :data-mood="m.value"
                                    :aria-pressed="form.mood === m.value"
                                    @click="toggleMood(m.value)"
                                >
                                    {{ m.label }}
                                </button>
                            </div>
                            <p v-if="form.errors.mood" class="lol-error">
                                {{ form.errors.mood }}
                            </p>
                        </div>

                        <div>
                            <label class="lol-label" :for="`notes-${match.id}`"
                                >¿Qué pasó en la partida?</label
                            >
                            <textarea
                                :id="`notes-${match.id}`"
                                v-model="form.notes"
                                rows="3"
                                maxlength="5000"
                                class="lol-input"
                            />
                            <p v-if="form.errors.notes" class="lol-error">
                                {{ form.errors.notes }}
                            </p>
                        </div>

                        <div>
                            <label class="lol-label" :for="`lesson-${match.id}`"
                                >¿Qué quiero mejorar?</label
                            >
                            <textarea
                                :id="`lesson-${match.id}`"
                                v-model="form.lesson"
                                rows="2"
                                maxlength="2000"
                                class="lol-input"
                            />
                            <p v-if="form.errors.lesson" class="lol-error">
                                {{ form.errors.lesson }}
                            </p>
                        </div>

                        <div>
                            <label class="lol-label" :for="`tag-${match.id}`"
                                >Etiquetas</label
                            >

                            <div v-if="form.tags.length" class="lol-tags mb-2">
                                <span
                                    v-for="tag in form.tags"
                                    :key="tag"
                                    class="lol-tag"
                                >
                                    #{{ tag }}
                                    <button
                                        type="button"
                                        :aria-label="`Quitar etiqueta ${tag}`"
                                        @click="removeTag(tag)"
                                    >
                                        <X :size="12" />
                                    </button>
                                </span>
                            </div>

                            <div class="flex gap-2">
                                <input
                                    :id="`tag-${match.id}`"
                                    v-model="tagInput"
                                    type="text"
                                    maxlength="50"
                                    placeholder="Ej: mal wardeo"
                                    class="lol-input"
                                    :disabled="form.tags.length >= MAX_TAGS"
                                    @keydown.enter.prevent="addTag()"
                                />
                                <button
                                    type="button"
                                    class="lol-btn"
                                    :disabled="form.tags.length >= MAX_TAGS"
                                    @click="addTag()"
                                >
                                    Añadir
                                </button>
                            </div>
                            <p
                                v-if="form.tags.length >= MAX_TAGS"
                                class="lol-muted mt-1"
                            >
                                Máximo {{ MAX_TAGS }} etiquetas.
                            </p>

                            <div
                                v-if="suggestions.length"
                                class="lol-tags mt-2"
                            >
                                <button
                                    v-for="tag in suggestions"
                                    :key="tag"
                                    type="button"
                                    class="lol-tag lol-tag--suggest"
                                    @click="addTag(tag)"
                                >
                                    + {{ tag }}
                                </button>
                            </div>

                            <p v-if="form.errors.tags" class="lol-error">
                                {{ form.errors.tags }}
                            </p>
                        </div>

                        <div class="lol-actions">
                            <button
                                type="submit"
                                class="lol-btn-primary lol-btn-inline"
                                :disabled="form.processing"
                            >
                                {{
                                    form.processing ? 'Guardando...' : 'Guardar'
                                }}
                            </button>
                            <button
                                type="button"
                                class="lol-btn"
                                @click="editingId = null"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </article>
            </div>
        </section>
    </div>
</template>
