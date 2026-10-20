<script setup lang="ts">
import { Head, router, usePage } from '@inertiajs/vue3';
import { computed, ref } from 'vue';

interface Account {
    id: number;
    label: string;
    game_name: string;
    tag_line: string;
    platform: string;
    matches_count: number;
}

interface Match {
    id: number;
    account_label: string;
    champion: string;
    role: string | null;
    win: boolean;
    kills: number;
    deaths: number;
    assists: number;
    damage_dealt: number;
    cs: number;
    duration: number;
    played_at: string;
}

defineProps<{
    accounts: Account[];
    matches: Match[];
}>();

const page = usePage();
const loadingId = ref<number | null>(null);

const successMessage = computed(
    () => (page.props.flash as { success?: string } | undefined)?.success,
);
const errorMessage = computed(
    () => (page.props.errors as Record<string, string>)?.fetch,
);

function fetchMatches(accountId: number) {
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

function formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const rest = String(seconds % 60).padStart(2, '0');
    return `${minutes}:${rest}`;
}

function formatDate(iso: string): string {
    return new Date(iso).toLocaleString('es-PY', {
        dateStyle: 'short',
        timeStyle: 'short',
    });
}
</script>

<template>
    <Head title="LoL Diary" />

    <div class="mx-auto max-w-5xl space-y-6 p-6">
        <h1 class="text-2xl font-bold">LoL Diary</h1>

        <Link href="/diary/calendar" class="text-sm underline">Ver calendario</Link>
        <p v-if="successMessage" class="rounded bg-green-100 p-3 text-green-800">
            {{ successMessage }}
        </p>
        <p v-if="errorMessage" class="rounded bg-red-100 p-3 text-red-800">
            {{ errorMessage }}
        </p>

        <section class="grid gap-3 sm:grid-cols-3">
            <div
                v-for="account in accounts"
                :key="account.id"
                class="rounded border p-4"
            >
                <p class="font-semibold">{{ account.label }}</p>
                <p class="text-sm opacity-70">
                    {{ account.game_name }}#{{ account.tag_line }} ·
                    {{ account.platform.toUpperCase() }}
                </p>
                <p class="mt-1 text-sm">{{ account.matches_count }} partidas</p>
                <button
                    class="mt-3 rounded bg-black px-3 py-1 text-sm text-white disabled:opacity-50"
                    :disabled="loadingId !== null"
                    @click="fetchMatches(account.id)"
                >
                    {{ loadingId === account.id ? 'Importando...' : 'Fetch' }}
                </button>
            </div>
        </section>

        <section>
            <h2 class="mb-2 text-lg font-semibold">Últimas partidas</h2>
            <p v-if="matches.length === 0" class="opacity-70">
                Todavía no hay partidas. Pulsa Fetch en una cuenta.
            </p>
            <div v-else class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead>
                        <tr class="border-b">
                            <th class="p-2">Fecha</th>
                            <th class="p-2">Cuenta</th>
                            <th class="p-2">Campeón</th>
                            <th class="p-2">Rol</th>
                            <th class="p-2">KDA</th>
                            <th class="p-2">Daño</th>
                            <th class="p-2">CS</th>
                            <th class="p-2">Duración</th>
                            <th class="p-2">Resultado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="match in matches" :key="match.id" class="border-b">
                            <td class="p-2">{{ formatDate(match.played_at) }}</td>
                            <td class="p-2">{{ match.account_label }}</td>
                            <td class="p-2">{{ match.champion }}</td>
                            <td class="p-2">{{ match.role ?? '-' }}</td>
                            <td class="p-2">
                                {{ match.kills }}/{{ match.deaths }}/{{ match.assists }}
                            </td>
                            <td class="p-2">{{ match.damage_dealt.toLocaleString() }}</td>
                            <td class="p-2">{{ match.cs }}</td>
                            <td class="p-2">{{ formatDuration(match.duration) }}</td>
                            <td
                                class="p-2 font-semibold"
                                :class="match.win ? 'text-green-600' : 'text-red-600'"
                            >
                                {{ match.win ? 'Victoria' : 'Derrota' }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</template>