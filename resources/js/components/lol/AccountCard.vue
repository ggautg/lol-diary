<script setup>
/**
 * Tarjeta de una cuenta de Riot.
 * Muestra la etiqueta, el Riot ID, el servidor y el total de partidas.
 * El resto del contenido (verificación, formularios, botones) se pasa por
 * los slots `default` y `actions`, para que Partidas y Cuentas compartan
 * exactamente el mismo aspecto.
 */
defineProps({
    account: { type: Object, required: true },
    /** Nombre legible del servidor; si falta se usa el código en mayúsculas. */
    platform: { type: String, default: '' },
    /** Efecto de elevación al pasar el ratón (solo en tarjetas de lectura). */
    interactive: { type: Boolean, default: false },
});
</script>

<template>
    <article
        class="lol-panel"
        :class="{ 'lol-panel--interactive': interactive }"
    >
        <div class="flex items-start justify-between gap-2">
            <div class="min-w-0">
                <p class="lol-account-label">{{ account.label }}</p>
                <p class="lol-account-id">
                    {{ account.game_name }}#{{ account.tag_line }}
                </p>
            </div>
            <span class="lol-badge">{{
                platform || account.platform.toUpperCase()
            }}</span>
        </div>

        <p class="lol-account-count">
            <strong>{{ account.matches_count }}</strong> partidas
            <slot name="meta" />
        </p>

        <slot />

        <div v-if="$slots.actions" class="lol-card-actions">
            <slot name="actions" />
        </div>
    </article>
</template>
