<script setup>
/**
 * Pantalla principal del diario: cuentas seguidas y últimas partidas.
 * Desde aquí se importan partidas nuevas desde Riot con un clic.
 */
import { Head, Link, router, usePage } from '@inertiajs/vue3';
import { RefreshCw } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import ChampionIcon from '@/components/ChampionIcon.vue';
import AccountCard from '@/components/lol/AccountCard.vue';
import FlashNotice from '@/components/lol/FlashNotice.vue';
import PageHeader from '@/components/lol/PageHeader.vue';
import StatStrip from '@/components/lol/StatStrip.vue';
import DiaryLayout from '@/layouts/DiaryLayout.vue';
import {
    csPerMinute,
    formatDuration,
    formatMatchDate,
    formatNumber,
    kdaRatio,
    roleLabel,
} from '@/lib/lol';

defineOptions({ layout: DiaryLayout });

const props = defineProps({
    accounts: { type: Array, required: true },
    matches: { type: Array, required: true },
});

const page = usePage();

/** Id de la cuenta cuya importación está en curso (bloquea el resto). */
const loadingId = ref(null);

const successMessage = computed(() => page.props.flash?.success);
const errorMessage = computed(() => page.props.errors?.fetch);

/** Resumen de las partidas mostradas en la tabla inferior. */
const summary = computed(() => {
    const games = props.matches.length;
    const wins = props.matches.filter((match) => match.win).length;

    return [
        { label: 'Cuentas', value: props.accounts.length },
        { label: 'Partidas', value: games },
        { label: 'Victorias', value: wins, tone: 'win' },
        { label: 'Derrotas', value: games - wins, tone: 'loss' },
        {
            label: 'Winrate',
            value: `${games === 0 ? 0 : Math.round((wins / games) * 100)}%`,
        },
    ];
});

function fetchMatches(accountId) {
    router.post(
        `/riot-accounts/${accountId}/fetch`,
        {},
        {
            preserveScroll: true,
            onStart: () => (loadingId.value = accountId),
            onFinish: () => (loadingId.value = null),
        },
    );
}
</script>

<template>
    <Head title="Partidas" />

    <div class="lol-container">
        <PageHeader
            title="Partidas"
            subtitle="Tus cuentas y las últimas partidas importadas."
        />

        <FlashNotice :success="successMessage" :error="errorMessage" />

        <StatStrip :stats="summary" />

        <section>
            <h2 class="lol-section-title">Cuentas</h2>

            <div v-if="accounts.length === 0" class="lol-panel text-sm">
                Todavía no tienes cuentas.
                <Link href="/diary/accounts" class="lol-link"
                    >Añade la primera</Link
                >.
            </div>

            <div
                v-else
                class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
                <AccountCard
                    v-for="(account, i) in accounts"
                    :key="account.id"
                    :account="account"
                    interactive
                    class="lol-rise"
                    :style="{ animationDelay: `${i * 70}ms` }"
                >
                    <template #actions>
                        <button
                            type="button"
                            class="lol-btn"
                            :disabled="loadingId !== null"
                            @click="fetchMatches(account.id)"
                        >
                            <RefreshCw
                                :size="14"
                                :class="{
                                    'lol-spin': loadingId === account.id,
                                }"
                            />
                            {{
                                loadingId === account.id
                                    ? 'Importando...'
                                    : 'Importar partidas'
                            }}
                        </button>
                    </template>
                </AccountCard>
            </div>
        </section>

        <section>
            <h2 class="lol-section-title">Últimas partidas</h2>

            <div v-if="matches.length === 0" class="lol-panel text-sm">
                Todavía no hay partidas. Importa las de una cuenta para
                empezar.
            </div>

            <div v-else class="lol-panel lol-rise !p-2">
                <div class="lol-table-wrap">
                    <table class="lol-table">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Cuenta</th>
                                <th>Campeón</th>
                                <th>Rol</th>
                                <th>KDA</th>
                                <th>Daño</th>
                                <th>CS</th>
                                <th>Duración</th>
                                <th>Resultado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="match in matches"
                                :key="match.id"
                                :data-result="match.win ? 'win' : 'loss'"
                            >
                                <td class="lol-num">
                                    {{ formatMatchDate(match.played_at) }}
                                </td>
                                <td>{{ match.account_label }}</td>
                                <td>
                                    <div class="lol-champ-cell">
                                        <ChampionIcon
                                            :champion="match.champion"
                                            :size="32"
                                        />
                                        <span class="lol-strong">{{
                                            match.champion
                                        }}</span>
                                    </div>
                                </td>
                                <td>{{ roleLabel(match.role) }}</td>
                                <td class="lol-num">
                                    <span class="lol-strong"
                                        >{{ match.kills }}/{{ match.deaths }}/{{
                                            match.assists
                                        }}</span
                                    >
                                    <span class="lol-muted">
                                        {{
                                            kdaRatio(
                                                match.kills,
                                                match.deaths,
                                                match.assists,
                                            )
                                        }}</span
                                    >
                                </td>
                                <td class="lol-num">
                                    {{ formatNumber(match.damage_dealt) }}
                                </td>
                                <td class="lol-num">
                                    {{ match.cs }}
                                    <span class="lol-muted"
                                        >{{
                                            csPerMinute(
                                                match.cs,
                                                match.duration,
                                            )
                                        }}/min</span
                                    >
                                </td>
                                <td class="lol-num">
                                    {{ formatDuration(match.duration) }}
                                </td>
                                <td>
                                    <span
                                        class="lol-badge"
                                        :class="
                                            match.win
                                                ? 'lol-badge--win'
                                                : 'lol-badge--loss'
                                        "
                                    >
                                        {{ match.win ? 'Victoria' : 'Derrota' }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </div>
</template>
