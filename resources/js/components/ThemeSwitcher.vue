<script setup>
import { Check, Palette } from 'lucide-vue-next';
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { useLolTheme } from '@/composables/useLolTheme';

const { themes, theme, setTheme } = useLolTheme();

const open = ref(false);
const mounted = ref(false);
const menu = ref(null);
const trigger = ref(null);
const panel = ref(null);

const baseThemes = themes.filter((item) => item.group === 'base');
const regionThemes = themes.filter((item) => item.group === 'region');

const current = computed(
    () => themes.find((item) => item.id === theme.value) ?? themes[0],
);

const swatch = (item) => ({
    background: `linear-gradient(135deg, ${item.swatch} 0 52%, ${item.accent} 52% 100%)`,
});

const optionElements = () => [
    ...(panel.value?.querySelectorAll('[role="menuitemradio"]') ?? []),
];

async function toggle() {
    if (open.value) {
        close(true);
        return;
    }

    open.value = true;
    await nextTick();

    const checked = optionElements().find(
        (element) => element.getAttribute('aria-checked') === 'true',
    );

    (checked ?? optionElements()[0])?.focus();
}

function close(focusTrigger = false) {
    if (!open.value) {
        return;
    }

    open.value = false;

    if (focusTrigger) {
        trigger.value?.focus();
    }
}

function select(id) {
    setTheme(id);
    close(true);
}

function onDocumentPointerDown(event) {
    if (!open.value || menu.value?.contains(event.target)) {
        return;
    }

    close();
}

function onDocumentKeydown(event) {
    if (event.key !== 'Escape' || !open.value) {
        return;
    }

    event.preventDefault();
    close(true);
}

function onPanelKeydown(event) {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
        return;
    }

    const items = optionElements();

    if (!items.length) {
        return;
    }

    event.preventDefault();

    const index = items.indexOf(document.activeElement);
    const next =
        event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? items.length - 1
              : event.key === 'ArrowDown'
                ? (index + 1) % items.length
                : (index - 1 + items.length) % items.length;

    items[next].focus();
}

onMounted(() => {
    mounted.value = true;
    document.addEventListener('pointerdown', onDocumentPointerDown);
    document.addEventListener('keydown', onDocumentKeydown);
});

onBeforeUnmount(() => {
    document.removeEventListener('pointerdown', onDocumentPointerDown);
    document.removeEventListener('keydown', onDocumentKeydown);
});
</script>

<template>
    <div ref="menu" class="lol-theme-menu">
        <button
            ref="trigger"
            type="button"
            class="lol-theme-trigger"
            aria-haspopup="menu"
            :aria-expanded="open"
            aria-controls="lol-theme-panel"
            @click="toggle"
        >
            <Palette aria-hidden="true" />
            <template v-if="mounted">
                <span
                    class="lol-theme-swatch"
                    :style="swatch(current)"
                    aria-hidden="true"
                />
                <span class="lol-theme-trigger-label">
                    {{ current.label }}
                </span>
            </template>
        </button>

        <div
            v-if="open"
            id="lol-theme-panel"
            ref="panel"
            class="lol-theme-panel"
            role="menu"
            aria-label="Tema de la interfaz"
            @keydown="onPanelKeydown"
        >
            <div class="lol-theme-group">
                <p class="lol-theme-group-title">Básicos</p>
                <div class="lol-theme-grid">
                    <button
                        v-for="item in baseThemes"
                        :key="item.id"
                        type="button"
                        role="menuitemradio"
                        :aria-checked="theme === item.id"
                        class="lol-theme-option"
                        @click="select(item.id)"
                    >
                        <span
                            class="lol-theme-swatch"
                            :style="swatch(item)"
                            aria-hidden="true"
                        />
                        <span class="lol-theme-option-label">
                            {{ item.label }}
                        </span>
                        <Check
                            v-if="theme === item.id"
                            class="lol-theme-check"
                            aria-hidden="true"
                        />
                    </button>
                </div>
            </div>

            <div class="lol-theme-group">
                <p class="lol-theme-group-title">Regiones de Runaterra</p>
                <div class="lol-theme-grid">
                    <button
                        v-for="item in regionThemes"
                        :key="item.id"
                        type="button"
                        role="menuitemradio"
                        :aria-checked="theme === item.id"
                        class="lol-theme-option"
                        @click="select(item.id)"
                    >
                        <span
                            class="lol-theme-swatch"
                            :style="swatch(item)"
                            aria-hidden="true"
                        />
                        <span class="lol-theme-option-label">
                            {{ item.label }}
                        </span>
                        <Check
                            v-if="theme === item.id"
                            class="lol-theme-check"
                            aria-hidden="true"
                        />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
