<script setup>
/**
 * Tabla de rendimiento por campeón.
 * Incluye el filtro de muestra mínima y el botón para mostrar todos.
 */
import { computed, ref } from 'vue';
import ChampionIcon from '@/components/ChampionIcon.vue';
import WinrateBar from '@/components/WinrateBar.vue';

const props = defineProps({
    champions: { type: Array, required: true },
    minGames: { type: Number, default: 3 },
});

const onlyReliable = ref(false);
const showAll = ref(false);

const rows = computed(() => {
    const list = onlyReliable.value
        ? props.champions.filter((row) => row.games >= props.minGames)
        : props.champions;

    return showAll.value ? list : list.slice(0, 10);
});
</script>

<template>
    <div class="lol-panel lol-rise !p-2">
        <div class="px-3 pt-2 pb-1">
            <label class="lol-check">
                <input v-model="onlyReliable" type="checkbox" />
                Solo con {{ minGames }}+ partidas
            </label>
        </div>

        <div class="lol-table-wrap">
            <table class="lol-table">
                <thead>
                    <tr>
                        <th>Campeón</th>
                        <th>Partidas</th>
                        <th>V / D</th>
                        <th>Winrate</th>
                        <th>KDA</th>
                        <th>Daño prom.</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="row in rows"
                        :key="row.champion"
                        :data-result="row.winrate >= 50 ? 'win' : 'loss'"
                    >
                        <td>
                            <div class="lol-champ-cell">
                                <ChampionIcon
                                    :champion="row.champion"
                                    :size="30"
                                />
                                <span class="lol-strong">{{
                                    row.champion
                                }}</span>
                            </div>
                        </td>
                        <td class="lol-num">{{ row.games }}</td>
                        <td class="lol-num">
                            {{ row.wins }} / {{ row.losses }}
                        </td>
                        <td>
                            <div class="lol-wr-cell">
                                <span
                                    class="lol-num lol-strong"
                                    :class="
                                        row.winrate >= 50
                                            ? 'lol-win-text'
                                            : 'lol-loss-text'
                                    "
                                >
                                    {{ row.winrate }}%
                                </span>
                                <WinrateBar
                                    :winrate="row.winrate"
                                    :games="row.games"
                                    :min-games="minGames"
                                />
                            </div>
                        </td>
                        <td class="lol-num">{{ row.kda }}</td>
                        <td class="lol-num">
                            {{
                                row.avg_damage.toLocaleString('es-PY')
                            }}
                        </td>
                    </tr>
                    <tr v-if="rows.length === 0">
                        <td colspan="6">Ningún campeón cumple el filtro.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div
            v-if="!showAll && champions.length > 10"
            class="px-3 py-2"
        >
            <button type="button" class="lol-btn" @click="showAll = true">
                Mostrar todos ({{ champions.length }})
            </button>
        </div>
    </div>
</template>
