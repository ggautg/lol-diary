<script setup>
/**
 * Selector de cuenta compartido por calendario, estadísticas y falencias.
 * Usa `v-model` con el id numérico de la cuenta o `null` para "todas".
 */
defineProps({
    accounts: { type: Array, required: true },
    modelValue: { type: [Number, String], default: null },
});

defineEmits(['update:modelValue']);
</script>

<template>
    <select
        class="lol-select"
        aria-label="Filtrar por cuenta"
        :value="modelValue"
        @change="
            $emit(
                'update:modelValue',
                $event.target.value === '' ? null : Number($event.target.value),
            )
        "
    >
        <option value="">Todas las cuentas</option>
        <option
            v-for="account in accounts"
            :key="account.id"
            :value="account.id"
        >
            {{ account.label }}
        </option>
    </select>
</template>
