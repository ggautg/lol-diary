<script setup>
/**
 * Editor de etiquetas reutilizable.
 * - Añade con Enter o con el botón.
 * - Normaliza a minúsculas, evita duplicados y respeta el máximo.
 * - `commit()` guarda una etiqueta escrita pero no confirmada; el formulario
 *   lo llama antes de enviar para no perder texto.
 */
import { X } from 'lucide-vue-next';
import { computed, ref } from 'vue';

const props = defineProps({
    suggestions: { type: Array, default: () => [] },
    max: { type: Number, default: 10 },
});

const tags = defineModel({ type: Array, default: () => [] });

const input = ref('');

const atLimit = computed(() => tags.value.length >= props.max);

const visibleSuggestions = computed(() =>
    props.suggestions
        .filter((tag) => !tags.value.includes(tag))
        .slice(0, 12),
);

function addTag(raw = input.value) {
    const name = raw.trim().toLowerCase();

    if (name !== '' && !tags.value.includes(name) && !atLimit.value) {
        tags.value = [...tags.value, name];
    }

    input.value = '';
}

function removeTag(name) {
    tags.value = tags.value.filter((tag) => tag !== name);
}

/** Guarda lo que quede escrito en el campo antes de enviar el formulario. */
function commit() {
    addTag();
}

defineExpose({ commit });
</script>

<template>
    <div>
        <div v-if="tags.length" class="lol-tags mb-2">
            <span v-for="tag in tags" :key="tag" class="lol-tag">
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

        <div class="lol-tag-input">
            <input
                v-model="input"
                type="text"
                maxlength="50"
                placeholder="Ej: mal wardeo"
                class="lol-input"
                :disabled="atLimit"
                @keydown.enter.prevent="addTag()"
            />
            <button
                type="button"
                class="lol-btn"
                :disabled="atLimit"
                @click="addTag()"
            >
                Añadir
            </button>
        </div>

        <p v-if="atLimit" class="lol-muted mt-1">
            Máximo {{ max }} etiquetas.
        </p>

        <div v-if="visibleSuggestions.length" class="lol-tags mt-2">
            <button
                v-for="tag in visibleSuggestions"
                :key="tag"
                type="button"
                class="lol-tag lol-tag--suggest"
                @click="addTag(tag)"
            >
                + {{ tag }}
            </button>
        </div>
    </div>
</template>
