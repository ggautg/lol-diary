<script setup lang="ts">
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';
import { computed, ref, watch } from 'vue';

interface Account {
    id: number;
    label: string;
}

interface Match {
    id: number;
    account_id: number;
    account_label: string;
    champion: string;
    role: string | null;
    win: boolean;
    kills: number;
    deaths: number;
    assists: number;
    damage_dealt: number;
    cs: number;
    duration: number;
    date: string;
    time: string;
    mood: string | null;
    notes: string | null;
    lesson: string | null;
    has_entry: boolean;
    tags: string[];
}

const props = defineProps<{
    month: string;
    prevMonth: string;
    nextMonth: string;
    accounts: Account[];
    matches: Match[];
    allTags: string[];
}>();

const page = usePage();
const successMessage = computed(
    () => (page.props.flash as { success?: string } | undefined)?.success,
);

const moods = [
    { value: 'focused', label: 'Concentrado' },
    { value: 'calm', label: 'Tranquilo' },
    { value: 'hyped', label: 'Motivado' },
    { value: 'tired', label: 'Cansado' },
    { value: 'tilted', label: 'Tilteado' },
];

function moodLabel(value: string | null): string {
    return moods.find((m) => m.value === value)?.label ?? '';
}

const editingId = ref<number | null>(null);
const tagInput = ref('');
const MAX_TAGS = 10;

const form = useForm({
    mood: null as string | null,
    notes: '',
    lesson: '',
    tags: [] as string[],
});

function addTag(raw: string = tagInput.value) {
    const name = raw.trim().toLowerCase();
    if (name !== '' && !form.tags.includes(name) && form.tags.length < MAX_TAGS) {
        form.tags.push(name);
    }
    tagInput.value = '';
}

function removeTag(name: string) {
    form.tags = form.tags.filter((tag) => tag !== name);
}

const suggestions = computed(() =>
    props.allTags.filter((tag) => !form.tags.includes(tag)).slice(0, 12),
);

function startEditing(match: Match) {
    form.clearErrors();
    form.mood = match.mood;
    form.notes = match.notes ?? '';
    form.lesson = match.lesson ?? '';
    form.tags = [...match.tags];
    tagInput.value = '';
    editingId.value = match.id;
}

function saveEntry(match: Match) {
    addTag(); // keep a tag that was typed but never confirmed with Enter

    form.put(`/matches/${match.id}/diary-entry`, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => (editingId.value = null),
    });
}
const weekdays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const selectedAccount = ref<number | null>(null);
const selectedDate = ref<string | null>(null);

watch(
    () => props.month,
    () => {
        selectedDate.value = null;
        editingId.value = null;
    },
);

watch(selectedDate, () => (editingId.value = null));

const filtered = computed(() =>
    props.matches.filter(
        (m) => selectedAccount.value === null || m.account_id === selectedAccount.value,
    ),
);

const byDate = computed(() => {
    const map = new Map<string, Match[]>();
    for (const match of filtered.value) {
        if (!map.has(match.date)) map.set(match.date, []);
        map.get(match.date)!.push(match);
    }
    return map;
});

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

    const list: ({ day: number; date: string } | null)[] = [];
    for (let i = 0; i < firstWeekday; i++) list.push(null);
    for (let day = 1; day <= daysInMonth; day++) {
        list.push({ day, date: `${props.month}-${String(day).padStart(2, '0')}` });
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
    selectedDate.value ? (byDate.value.get(selectedDate.value) ?? []) : [],
);

const now = new Date();
const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

function formatDuration(seconds: number): string {
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}
</script>

<template>

    <Head title="Calendario" />

    <div class="mx-auto max-w-5xl space-y-5 p-6">
        <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold">LoL Diary</h1>
            <Link href="/diary" class="text-sm underline">Ver lista y Fetch</Link>
        </div>

        <p v-if="successMessage" class="rounded bg-green-100 p-3 text-green-800">
            {{ successMessage }}
        </p>

        <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-3">
                <Link :href="'/diary/calendar?month=' + prevMonth" class="rounded border px-3 py-1">&larr;</Link>
                <h2 class="w-48 text-center text-lg font-semibold capitalize">{{ monthLabel }}</h2>
                <Link :href="'/diary/calendar?month=' + nextMonth" class="rounded border px-3 py-1">&rarr;</Link>
            </div>

            <select v-model="selectedAccount" class="rounded border bg-transparent px-2 py-1">
                <option :value="null">Todas las cuentas</option>
                <option v-for="account in accounts" :key="account.id" :value="account.id">
                    {{ account.label }}
                </option>
            </select>
        </div>

        <p class="text-sm opacity-80">
            {{ summary.games }} partidas · {{ summary.wins }}V {{ summary.losses }}D ·
            {{ summary.winrate }}% winrate
        </p>

        <div class="grid grid-cols-7 gap-1">
            <div v-for="day in weekdays" :key="day" class="p-1 text-center text-xs font-semibold opacity-70">
                {{ day }}
            </div>

            <template v-for="(cell, index) in cells" :key="index">
                <div v-if="cell === null" />
                <button v-else type="button" class="min-h-24 rounded border p-1 text-left align-top" :class="[
                    selectedDate === cell.date ? 'ring-2 ring-blue-500' : '',
                    cell.date === today ? 'border-blue-500' : '',
                ]" @click="selectedDate = cell.date">
                    <span class="text-xs opacity-70">{{ cell.day }}</span>
                    <div class="mt-1 space-y-0.5">
                        <div v-for="match in (byDate.get(cell.date) ?? []).slice(0, 3)" :key="match.id"
                            class="truncate rounded px-1 text-xs text-white"
                            :class="match.win ? 'bg-green-600' : 'bg-red-600'">
                            {{ match.champion }}<span v-if="match.has_entry"> ✎</span>
                        </div>
                        <div v-if="(byDate.get(cell.date)?.length ?? 0) > 3" class="text-xs opacity-70">
                            +{{ (byDate.get(cell.date)?.length ?? 0) - 3 }} más
                        </div>
                    </div>
                </button>
            </template>
        </div>

        <section v-if="selectedDate">
            <h3 class="mb-2 font-semibold">{{ selectedDate }}</h3>
            <p v-if="selectedMatches.length === 0" class="text-sm opacity-70">
                No hay partidas este día.
            </p>
            <div v-else class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead>
                        <tr class="border-b">
                            <th class="p-2">Hora</th>
                            <th class="p-2">Cuenta</th>
                            <th class="p-2">Campeón</th>
                            <th class="p-2">Rol</th>
                            <th class="p-2">KDA</th>
                            <th class="p-2">Daño</th>
                            <th class="p-2">CS</th>
                            <th class="p-2">Duración</th>
                            <th class="p-2">Resultado</th>
                            <th class="p-2">Nota</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="match in selectedMatches" :key="match.id">
                            <tr class="border-b">
                                <td class="p-2">{{ match.time }}</td>
                                <td class="p-2">{{ match.account_label }}</td>
                                <td class="p-2">{{ match.champion }}</td>
                                <td class="p-2">{{ match.role ?? '-' }}</td>
                                <td class="p-2">{{ match.kills }}/{{ match.deaths }}/{{ match.assists }}</td>
                                <td class="p-2">{{ match.damage_dealt.toLocaleString() }}</td>
                                <td class="p-2">{{ match.cs }}</td>
                                <td class="p-2">{{ formatDuration(match.duration) }}</td>
                                <td class="p-2 font-semibold" :class="match.win ? 'text-green-600' : 'text-red-600'">
                                    {{ match.win ? 'Victoria' : 'Derrota' }}
                                </td>
                                <td class="p-2">
                                    <button type="button" class="underline" @click="startEditing(match)">
                                        {{ match.has_entry ? 'Editar' : 'Anotar' }}
                                    </button>
                                </td>
                            </tr>

                            <tr v-if="match.has_entry && editingId !== match.id" class="border-b">
                                <td colspan="10" class="space-y-1 p-2 text-sm">
                                    <p v-if="match.mood"><strong>Ánimo:</strong> {{ moodLabel(match.mood) }}</p>
                                    <p v-if="match.notes" class="whitespace-pre-line">
                                        <strong>Notas:</strong> {{ match.notes }}
                                    </p>
                                    <p v-if="match.lesson" class="whitespace-pre-line">
                                        <strong>Lección:</strong> {{ match.lesson }}
                                    </p>
                                    <p v-if="match.tags.length">
                                        <strong>Etiquetas:</strong> {{match.tags.map((tag) => '#' + tag).join(' ')}}
                                    </p>
                                </td>
                            </tr>

                            <tr v-if="editingId === match.id" class="border-b">
                                <td colspan="10" class="p-3">
                                    <form class="space-y-3" @submit.prevent="saveEntry(match)">
                                        <div>
                                            <label class="mb-1 block text-sm font-semibold">Estado de ánimo</label>
                                            <select v-model="form.mood" class="rounded border bg-transparent px-2 py-1">
                                                <option :value="null">Sin definir</option>
                                                <option v-for="m in moods" :key="m.value" :value="m.value">
                                                    {{ m.label }}
                                                </option>
                                            </select>
                                            <p v-if="form.errors.mood" class="text-sm text-red-600">{{ form.errors.mood
                                            }}</p>
                                        </div>

                                        <div>
                                            <label class="mb-1 block text-sm font-semibold">¿Qué pasó en la
                                                partida?</label>
                                            <textarea v-model="form.notes" rows="3"
                                                class="w-full rounded border bg-transparent p-2" />
                                            <p v-if="form.errors.notes" class="text-sm text-red-600">{{
                                                form.errors.notes }}</p>
                                        </div>

                                        <div>
                                            <label class="mb-1 block text-sm font-semibold">¿Qué quiero mejorar?</label>
                                            <textarea v-model="form.lesson" rows="2"
                                                class="w-full rounded border bg-transparent p-2" />
                                            <p v-if="form.errors.lesson" class="text-sm text-red-600">{{
                                                form.errors.lesson }}</p>
                                        </div>

                                        <div>
                                            <label class="mb-1 block text-sm font-semibold">Etiquetas</label>

                                            <div v-if="form.tags.length" class="mb-2 flex flex-wrap gap-1">
                                                <span v-for="tag in form.tags" :key="tag"
                                                    class="flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs">
                                                    #{{ tag }}
                                                    <button type="button" aria-label="Quitar etiqueta"
                                                        @click="removeTag(tag)">×</button>
                                                </span>
                                            </div>

                                            <div class="flex gap-2">
                                                <input v-model="tagInput" type="text" maxlength="50"
                                                    placeholder="Ej: mal wardeo"
                                                    class="rounded border bg-transparent px-2 py-1 text-sm"
                                                    @keydown.enter.prevent="addTag()" />
                                                <button type="button" class="rounded border px-2 py-1 text-sm"
                                                    @click="addTag()">
                                                    Añadir
                                                </button>
                                            </div>

                                            <div v-if="suggestions.length" class="mt-2 flex flex-wrap gap-1">
                                                <button v-for="tag in suggestions" :key="tag" type="button"
                                                    class="rounded-full border border-dashed px-2 py-0.5 text-xs opacity-70"
                                                    @click="addTag(tag)">
                                                    + {{ tag }}
                                                </button>
                                            </div>

                                            <p v-if="form.errors.tags" class="text-sm text-red-600">{{ form.errors.tags
                                                }}</p>
                                        </div>

                                        <div class="flex gap-2">
                                            <button type="submit"
                                                class="rounded bg-black px-3 py-1 text-sm text-white disabled:opacity-50"
                                                :disabled="form.processing">
                                                {{ form.processing ? 'Guardando...' : 'Guardar' }}
                                            </button>
                                            <button type="button" class="rounded border px-3 py-1 text-sm"
                                                @click="editingId = null">
                                                Cancelar
                                            </button>
                                        </div>
                                    </form>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</template>