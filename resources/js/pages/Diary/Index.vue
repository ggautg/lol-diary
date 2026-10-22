<script setup>
import { Head, Link, router, usePage } from '@inertiajs/vue3';
import { RefreshCw } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import ChampionIcon from '@/components/ChampionIcon.vue';
import DiaryLayout from '@/layouts/DiaryLayout.vue';
import {
    csPerMinute,
    formatDuration,
    formatMatchDate,
    kdaRatio,
    roleLabel,
} from '@/lib/lol';

defineOptions({ layout: DiaryLayout });

defineProps({
    accounts: { type: Array, required: true },
    matches: { type: Array, required: true },
});

const page = usePage();
const loadingId = ref(null);

const successMessage = computed(() => page.props.flash?.success);
const errorMessage = computed(() => page.props.errors?.fetch);

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
        <header>
            <h1 class="lol-page-title">Partidas</h1>
            <p class="lol-page-sub">
                Tus cuentas y las últimas partidas importadas.
            </p>
        </header>

        <p v-if="successMessage" class="lol-notice">{{ successMessage }}</p>
        <p v-if="errorMessage" class="lol-notice lol-notice--error">
            {{ errorMessage }}
        </p>

        <section>
            <h2 class="lol-section-title">Cuentas</h2>

            <div v-if="accounts.length === 0" class="lol-panel text-sm">
                Todavía no tienes cuentas.
                <Link href="/diary/accounts" class="lol-link"
                    >Añade la primera</Link
                >.
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <article
                    v-for="(account, i) in accounts"
                    :key="account.id"
                    class="lol-panel lol-panel--interactive lol-rise"
                    :style="{ animationDelay: `${i * 70}ms` }"
                >
                    <div class="flex items-start justify-between gap-2">
                        <div>
                            <p class="lol-account-label">{{ account.label }}</p>
                            <p class="lol-account-id">
                                {{ account.game_name }}#{{ account.tag_line }}
                            </p>
                        </div>
                        <span class="lol-badge">{{
                            account.platform.toUpperCase()
                        }}</span>
                    </div>

                    <p class="lol-account-count">
                        <strong>{{ account.matches_count }}</strong>
                        partidas
                    </p>

                    <button
                        type="button"
                        class="lol-btn"
                        :disabled="loadingId !== null"
                        @click="fetchMatches(account.id)"
                    >
                        <RefreshCw
                            :size="14"
                            :class="{ 'lol-spin': loadingId === account.id }"
                        />
                        {{
                            loadingId === account.id ? 'Importando...' : 'Fetch'
                        }}
                    </button>
                </article>
            </div>
        </section>

        <section>
            <h2 class="lol-section-title">Últimas partidas</h2>

            <div v-if="matches.length === 0" class="lol-panel text-sm">
                Todavía no hay partidas. Pulsa Fetch en una cuenta.
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
                                    {{
                                        match.damage_dealt.toLocaleString(
                                            'es-PY',
                                        )
                                    }}
                                </td>
                                <td class="lol-num">
                                    {{ match.cs }}
                                    <span class="lol-muted"
                                        >{{
                                            csPerMinute(
                                                match.cs,
                                                match.duration,
                                            )
                                        }}/m</span
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
