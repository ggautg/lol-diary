<script setup>
/**
 * Tarjeta de una partida dentro del detalle de un día.
 * Muestra el resumen de la partida, la nota guardada y, al pulsar
 * "Anotar"/"Editar", el formulario del diario.
 *
 * El estado de edición lo controla el calendario (`editing`) para que
 * solo haya una partida abierta a la vez.
 */
import { useForm } from '@inertiajs/vue3';
import { Pencil } from 'lucide-vue-next';
import { ref, watch } from 'vue';
import ChampionIcon from '@/components/ChampionIcon.vue';
import MoodPicker from '@/components/lol/MoodPicker.vue';
import TagEditor from '@/components/lol/TagEditor.vue';
import {
    csPerMinute,
    formatDuration,
    kdaRatio,
    moodLabel,
    roleLabel,
} from '@/lib/lol';

const props = defineProps({
    match: { type: Object, required: true },
    editing: { type: Boolean, default: false },
    allTags: { type: Array, default: () => [] },
    maxTags: { type: Number, default: 10 },
});

const emit = defineEmits(['edit', 'close', 'saved']);

const tagEditor = ref(null);

const form = useForm({
    mood: null,
    notes: '',
    lesson: '',
    tags: [],
});

// Al abrir el formulario se carga lo que ya estaba guardado en la partida.
watch(
    () => props.editing,
    (editing) => {
        if (!editing) {
            return;
        }

        form.clearErrors();
        form.mood = props.match.mood ?? null;
        form.notes = props.match.notes ?? '';
        form.lesson = props.match.lesson ?? '';
        form.tags = [...props.match.tags];
        tagEditor.value?.commit();
    },
    { immediate: true },
);

function save() {
    // Recoge una etiqueta escrita pero no confirmada con Enter.
    tagEditor.value?.commit();

    form.put(`/matches/${props.match.id}/diary-entry`, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => emit('saved'),
    });
}
</script>

<template>
    <article
        class="lol-panel lol-match"
        :data-result="match.win ? 'win' : 'loss'"
    >
        <div class="lol-match-row">
            <div class="lol-champ-cell lol-match-champ">
                <ChampionIcon :champion="match.champion" :size="44" />
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
                        {{ match.kills }}/{{ match.deaths }}/{{ match.assists }}
                        <span class="lol-muted">{{
                            kdaRatio(match.kills, match.deaths, match.assists)
                        }}</span>
                    </p>
                </div>
                <div>
                    <p class="lol-mini-label">Daño</p>
                    <p class="lol-mini-value">
                        {{ match.damage_dealt.toLocaleString('es-PY') }}
                    </p>
                </div>
                <div>
                    <p class="lol-mini-label">CS</p>
                    <p class="lol-mini-value">
                        {{ match.cs }}
                        <span class="lol-muted"
                            >{{
                                csPerMinute(match.cs, match.duration)
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
                :class="match.win ? 'lol-badge--win' : 'lol-badge--loss'"
            >
                {{ match.win ? 'Victoria' : 'Derrota' }}
            </span>

            <button
                type="button"
                class="lol-btn"
                :aria-expanded="editing"
                @click="emit(editing ? 'close' : 'edit')"
            >
                <Pencil :size="14" />
                {{ editing ? 'Cerrar' : match.has_entry ? 'Editar' : 'Anotar' }}
            </button>
        </div>

        <div v-if="match.has_entry && !editing" class="lol-match-note">
            <p v-if="match.mood">
                <span class="lol-badge" :data-mood="match.mood">{{
                    moodLabel(match.mood)
                }}</span>
            </p>
            <p v-if="match.notes" class="whitespace-pre-line">
                <span class="lol-note-label">Notas</span>{{ match.notes }}
            </p>
            <p v-if="match.lesson" class="whitespace-pre-line">
                <span class="lol-note-label">Lección</span>{{ match.lesson }}
            </p>
            <div v-if="match.tags.length" class="lol-tags">
                <span v-for="tag in match.tags" :key="tag" class="lol-tag"
                    >#{{ tag }}</span
                >
            </div>
        </div>

        <form v-if="editing" class="lol-form" @submit.prevent="save">
            <div>
                <p class="lol-label">Estado de ánimo</p>
                <MoodPicker v-model="form.mood" />
                <p v-if="form.errors.mood" class="lol-error">
                    {{ form.errors.mood }}
                </p>
            </div>

            <div>
                <label class="lol-label" :for="`notes-${match.id}`">
                    ¿Qué pasó en la partida?
                </label>
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
                <label class="lol-label" :for="`lesson-${match.id}`">
                    ¿Qué quiero mejorar?
                </label>
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
                <p class="lol-label">Etiquetas</p>
                <TagEditor
                    :id="`tag-${match.id}`"
                    ref="tagEditor"
                    v-model="form.tags"
                    :suggestions="allTags"
                    :max="maxTags"
                />
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
                    {{ form.processing ? 'Guardando...' : 'Guardar' }}
                </button>
                <button
                    type="button"
                    class="lol-btn"
                    @click="emit('close')"
                >
                    Cancelar
                </button>
            </div>
        </form>
    </article>
</template>
