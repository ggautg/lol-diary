<script setup>
/**
 * Análisis de falencias: diagnóstico general, prioridades de mejora,
 * todas las áreas evaluadas, rendimiento por rol y fortalezas.
 * El filtro de cuenta viaja en la URL igual que en Estadísticas.
 */
import { Head, router } from '@inertiajs/vue3';
import { computed } from 'vue';
import AccountFilter from '@/components/lol/AccountFilter.vue';
import PageHeader from '@/components/lol/PageHeader.vue';
import StatStrip from '@/components/lol/StatStrip.vue';
import DiaryLayout from '@/layouts/DiaryLayout.vue';
import { formatNumber } from '@/lib/lol';

defineOptions({ layout: DiaryLayout });

const props = defineProps({
    accounts: { type: Array, required: true },
    selectedAccount: { type: Number, default: null },
    analysis: { type: Object, required: true },
});

const selected = computed({
    get: () => props.selectedAccount,
    set: (value) => {
        router.get(
            '/diary/weaknesses',
            value === null ? {} : { account: value },
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
            },
        );
    },
});

function levelLabel(level) {
    return (
        {
            alta: 'Prioridad alta',
            media: 'Prioridad media',
            baja: 'A vigilar',
            ok: 'Objetivo cumplido',
        }[level] ?? level
    );
}

function statusClass(area) {
    return {
        'lol-badge--loss': area.level === 'alta',
        'lol-badge--win': area.level === 'ok',
    };
}

const periodLabel = computed(() => {
    const period = props.analysis.period;

    if (!period) {
        return '';
    }

    return period.from === period.to
        ? period.from
        : `${period.from} — ${period.to}`;
});

const remakeNote = computed(() => {
    const remakes = props.analysis.remakes;

    if (!remakes) {
        return null;
    }

    return `${remakes} ${remakes === 1 ? 'remake excluido' : 'remakes excluidos'}`;
});

/** Cifras que resumen el diagnóstico en la franja superior. */
const overview = computed(() => [
    {
        label: 'Partidas',
        value: props.analysis.games,
        small: true,
    },
    {
        label: 'Winrate',
        value: `${formatNumber(props.analysis.winrate, 1)}%`,
        tone: props.analysis.winrate >= 50 ? 'win' : 'loss',
        small: true,
    },
    {
        label: 'Prioridades',
        value: props.analysis.weaknesses.length,
        small: true,
    },
    {
        label: 'Fortalezas',
        value: props.analysis.strengths.length,
        tone: 'win',
        small: true,
    },
]);
</script>

<template>
    <Head title="Falencias" />

    <div class="lol-container">
        <PageHeader
            title="Falencias"
            subtitle="Lo que tus partidas dicen que más te está costando, con objetivos claros para mejorar."
        >
            <template #actions>
                <AccountFilter v-model="selected" :accounts="accounts" />
            </template>
        </PageHeader>

        <div v-if="analysis.games === 0" class="lol-panel text-sm">
            Todavía no hay partidas suficientes para analizar tus falencias.
            Importa algunas desde la sección Partidas. Los remakes y las
            partidas de menos de 5 minutos no cuentan.
        </div>

        <template v-else>
            <!-- Diagnosis -->
            <section>
                <h2 class="lol-section-title">Diagnóstico</h2>

                <div class="lol-panel lol-overview lol-rise">
                    <div
                        class="lol-ring"
                        :style="{ '--pct': analysis.score }"
                        role="img"
                        :aria-label="`Puntaje de mejora ${analysis.score} de 100`"
                    >
                        <span class="lol-ring-value">
                            {{ analysis.score }}<small>/100</small>
                        </span>
                    </div>

                    <div class="lol-overview-body">
                        <p class="lol-diagnosis">{{ analysis.diagnosis }}</p>

                        <p class="lol-muted">
                            {{ periodLabel }} · {{ analysis.games }} partidas
                            <template v-if="remakeNote">
                                · {{ remakeNote }}
                            </template>
                        </p>

                        <StatStrip :stats="overview" />
                    </div>
                </div>
            </section>

            <!-- Priorities -->
            <section>
                <h2 class="lol-section-title">Tus prioridades</h2>

                <div
                    v-if="analysis.weaknesses.length === 0"
                    class="lol-panel text-sm"
                >
                    Con las partidas analizadas no hay falencias claras. Sigue
                    jugando y revisa esta página cuando tengas más muestra.
                </div>

                <div v-else class="lol-weakness-grid">
                    <article
                        v-for="(weakness, i) in analysis.weaknesses"
                        :key="weakness.key"
                        class="lol-panel lol-weakness lol-rise"
                        :data-level="weakness.level"
                        :style="{ animationDelay: `${i * 70}ms` }"
                    >
                        <div class="lol-weakness-head">
                            <span class="lol-badge">{{
                                weakness.category
                            }}</span>
                            <span
                                class="lol-weakness-severity"
                                :data-level="weakness.level"
                            >
                                {{ levelLabel(weakness.level) }} ·
                                {{ weakness.severity }}/100
                            </span>
                        </div>

                        <h3 class="lol-weakness-title">
                            {{ weakness.title }}
                            <span v-if="weakness.scope" class="lol-muted">
                                · {{ weakness.scope }}
                            </span>
                        </h3>

                        <div class="lol-weakness-metric">
                            <strong>{{ weakness.display }}</strong>
                            <span>{{ weakness.unit }}</span>
                            <span class="lol-muted">
                                objetivo {{ weakness.target_display }}
                            </span>
                        </div>

                        <div
                            class="lol-severity-track"
                            role="img"
                            :aria-label="`Severidad ${weakness.severity} de 100`"
                        >
                            <span
                                class="lol-severity-fill"
                                :style="{ width: `${weakness.severity}%` }"
                            />
                        </div>

                        <p class="lol-weakness-summary">
                            {{ weakness.summary }}
                        </p>

                        <p v-if="weakness.advice" class="lol-weakness-advice">
                            <strong>Qué practicar:</strong>
                            {{ weakness.advice }}
                        </p>

                        <p class="lol-weakness-sample">
                            {{ weakness.sample }} partidas analizadas
                        </p>
                    </article>
                </div>
            </section>

            <!-- Every area -->
            <section>
                <h2 class="lol-section-title">Todas las áreas</h2>

                <div class="lol-panel lol-rise !p-2">
                    <div class="lol-table-wrap">
                        <table class="lol-table">
                            <thead>
                                <tr>
                                    <th>Área</th>
                                    <th>Métrica</th>
                                    <th>Tu dato</th>
                                    <th>Objetivo</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="area in analysis.areas"
                                    :key="area.key"
                                    :data-level="area.level"
                                >
                                    <td>
                                        <span class="lol-strong">{{
                                            area.title
                                        }}</span>
                                        <span
                                            v-if="area.scope"
                                            class="lol-muted"
                                        >
                                            · {{ area.scope }}
                                        </span>
                                    </td>
                                    <td>{{ area.metric_label }}</td>
                                    <td class="lol-num">
                                        <span
                                            :class="{
                                                'lol-loss-text':
                                                    area.level === 'alta',
                                            }"
                                            >{{ area.display }}</span
                                        >
                                        <span class="lol-muted lol-unit">
                                            {{ area.unit }}
                                        </span>
                                    </td>
                                    <td class="lol-num">
                                        {{ area.target_display }}
                                    </td>
                                    <td>
                                        <span
                                            class="lol-badge"
                                            :class="statusClass(area)"
                                        >
                                            {{ area.status }}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <!-- By role -->
            <section v-if="analysis.roles.length">
                <h2 class="lol-section-title">Por rol</h2>

                <div class="lol-panel lol-rise !p-2">
                    <div class="lol-table-wrap">
                        <table class="lol-table">
                            <thead>
                                <tr>
                                    <th>Rol</th>
                                    <th>Partidas</th>
                                    <th>WR</th>
                                    <th>Muertes / 10</th>
                                    <th>Visión / min</th>
                                    <th>CS / min</th>
                                    <th>Wards control</th>
                                    <th>Tiempo muerto</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="role in analysis.roles"
                                    :key="role.key"
                                    :class="{
                                        'is-low-sample': !role.reliable,
                                    }"
                                >
                                    <td>
                                        <span class="lol-strong">{{
                                            role.label
                                        }}</span>
                                        <span
                                            v-if="!role.reliable"
                                            class="lol-badge ml-2"
                                        >
                                            muestra baja
                                        </span>
                                    </td>
                                    <td class="lol-num">{{ role.games }}</td>
                                    <td
                                        class="lol-num"
                                        :class="
                                            role.winrate >= 50
                                                ? 'lol-win-text'
                                                : 'lol-loss-text'
                                        "
                                    >
                                        {{ formatNumber(role.winrate, 1) }}%
                                    </td>
                                    <td
                                        class="lol-num"
                                        :class="{
                                            'lol-loss-text': role.flags.deaths,
                                        }"
                                    >
                                        {{
                                            formatNumber(role.deaths_per_10, 2)
                                        }}
                                    </td>
                                    <td
                                        class="lol-num"
                                        :class="{
                                            'lol-loss-text': role.flags.vision,
                                        }"
                                    >
                                        {{
                                            formatNumber(role.vision_per_min, 2)
                                        }}
                                    </td>
                                    <td
                                        class="lol-num"
                                        :class="{
                                            'lol-loss-text': role.flags.cs,
                                        }"
                                    >
                                        {{ formatNumber(role.cs_per_min, 1) }}
                                    </td>
                                    <td
                                        class="lol-num"
                                        :class="{
                                            'lol-loss-text':
                                                role.flags.control_wards,
                                        }"
                                    >
                                        {{
                                            formatNumber(
                                                role.control_wards_per_game,
                                                1,
                                            )
                                        }}
                                    </td>
                                    <td
                                        class="lol-num"
                                        :class="{
                                            'lol-loss-text':
                                                role.flags.dead_time,
                                        }"
                                    >
                                        {{
                                            formatNumber(role.dead_time_pct, 1)
                                        }}
                                        %
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p class="lol-hint px-3 py-2">
                        Solo se analizan roles con 4 partidas o más. Las filas
                        marcadas como «muestra baja» son contexto: no alcanzan
                        para sacar conclusiones.
                    </p>
                </div>
            </section>

            <!-- Strengths -->
            <section v-if="analysis.strengths.length">
                <h2 class="lol-section-title">Lo que ya haces bien</h2>

                <div class="lol-strength-grid">
                    <article
                        v-for="strength in analysis.strengths"
                        :key="strength.key"
                        class="lol-panel lol-strength lol-rise"
                    >
                        <div class="lol-weakness-head">
                            <span class="lol-badge lol-badge--win">
                                {{ strength.category }}
                            </span>
                            <span class="lol-strength-check">✓</span>
                        </div>

                        <h3 class="lol-weakness-title">
                            {{ strength.title }}
                            <span v-if="strength.scope" class="lol-muted">
                                · {{ strength.scope }}
                            </span>
                        </h3>

                        <div class="lol-weakness-metric">
                            <strong>{{ strength.display }}</strong>
                            <span>{{ strength.unit }}</span>
                            <span class="lol-muted">
                                objetivo {{ strength.target_display }}
                            </span>
                        </div>

                        <p class="lol-weakness-summary">
                            {{ strength.summary }}
                        </p>
                    </article>
                </div>
            </section>

            <!-- Methodology -->
            <section>
                <h2 class="lol-section-title">Cómo se calcula</h2>

                <div class="lol-panel lol-rise">
                    <p class="lol-muted mb-3">
                        Se analizan las partidas importadas de tus cuentas, sin
                        contar remakes ni partidas de menos de 5 minutos. Los
                        roles con menos de 4 partidas no entran en el
                        diagnóstico.
                    </p>

                    <ul class="lol-benchmark-list">
                        <li
                            v-for="benchmark in analysis.benchmarks"
                            :key="benchmark.label"
                        >
                            <strong>{{ benchmark.label }}:</strong>
                            {{ benchmark.target }}
                        </li>
                    </ul>

                    <p class="lol-muted mt-3">
                        Los objetivos son referencias generales de mejora, no
                        verdades absolutas: dependen de tu elo, tus campeones y
                        el estilo de cada partida. Úsalos para detectar
                        patrones, no para castigarte por un dato aislado.
                    </p>
                </div>
            </section>
        </template>
    </div>
</template>
