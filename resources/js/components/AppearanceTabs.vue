<script setup>
/**
 * Selector de paleta del diario.
 * Las paletas se agrupan en básicas (claro/oscuro) y regionales de
 * Runaterra; la elegida se guarda en el navegador y repinta toda la app.
 */
import { Check } from 'lucide-vue-next';
import { computed } from 'vue';
import { useLolTheme } from '@/composables/useLolTheme';

const { themes, theme, setTheme } = useLolTheme();

const groups = computed(() => [
    {
        title: 'Básicos',
        items: themes.filter((item) => item.group === 'base'),
    },
    {
        title: 'Regiones de Runaterra',
        items: themes.filter((item) => item.group === 'region'),
    },
]);

/** Vista previa: mitad fondo de página, mitad color de acento. */
function swatch(item) {
    return {
        background: `linear-gradient(135deg, ${item.swatch} 0 52%, ${item.accent} 52% 100%)`,
    };
}
</script>

<template>
    <div class="lol-form">
        <div
            v-for="group in groups"
            :key="group.title"
            class="lol-settings-group"
        >
            <p class="lol-label">{{ group.title }}</p>

            <div class="lol-theme-grid">
                <button
                    v-for="item in group.items"
                    :key="item.id"
                    type="button"
                    role="menuitemradio"
                    :aria-checked="theme === item.id"
                    class="lol-theme-option"
                    @click="setTheme(item.id)"
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
</template>
