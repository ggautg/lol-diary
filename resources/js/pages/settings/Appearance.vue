<script setup>
/**
 * Ajustes de apariencia: paleta de colores del diario.
 * La elección se guarda en el navegador, así que no toca la base de datos.
 */
import { Head } from '@inertiajs/vue3';
import AppearanceTabs from '@/components/AppearanceTabs.vue';
</script>

<template>
    <Head title="Apariencia" />

    <div class="lol-settings-section">
        <h2 class="lol-settings-heading">Apariencia</h2>
        <p class="lol-muted">
            Elige la paleta del diario. Se guarda en este navegador y se aplica
            al instante en todas las pantallas.
        </p>

        <AppearanceTabs />
    </div>
</template>
