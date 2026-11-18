<script setup>
/**
 * Gestión de cuentas de Riot: añadir, editar, verificar y eliminar.
 * Añadir una cuenta consulta Riot para comprobar que el Riot ID existe.
 */
import { Head, router, useForm, usePage } from '@inertiajs/vue3';
import { Pencil, RefreshCw, Trash2 } from 'lucide-vue-next';
import { computed, ref, watch } from 'vue';
import AccountCard from '@/components/lol/AccountCard.vue';
import FlashNotice from '@/components/lol/FlashNotice.vue';
import PageHeader from '@/components/lol/PageHeader.vue';
import DiaryLayout from '@/layouts/DiaryLayout.vue';

defineOptions({ layout: DiaryLayout });

const props = defineProps({
    accounts: { type: Array, required: true },
    platforms: { type: Array, required: true },
    maxAccounts: { type: Number, required: true },
});

const page = usePage();

const successMessage = computed(() => page.props.flash?.success);
const errorMessage = computed(() => page.props.errors?.account);

function platformLabel(value) {
    return (
        props.platforms.find((platform) => platform.value === value)?.label ??
        value.toUpperCase()
    );
}

const atLimit = computed(() => props.accounts.length >= props.maxAccounts);

/* ---------- Añadir ---------- */
const addForm = useForm({
    riot_id: '',
    label: '',
    platform:
        props.platforms.find((platform) => platform.value === 'la2')?.value ??
        props.platforms[0]?.value ??
        'la2',
});

/**
 * La etiqueta se rellena sola con la parte anterior al «#» del Riot ID.
 * En cuanto el usuario escribe una etiqueta propia dejamos de tocarla.
 */
const labelTouched = ref(false);

/** "Faker#KR1" → "faker" */
function suggestLabel(riotId) {
    return riotId.split('#')[0].trim().toLowerCase();
}

watch(
    () => addForm.riot_id,
    (riotId) => {
        if (!labelTouched.value) {
            addForm.label = suggestLabel(riotId);
        }
    },
);

function submitAdd() {
    addForm.post('/riot-accounts', {
        preserveScroll: true,
        onSuccess: () => {
            addForm.reset('riot_id', 'label');
            labelTouched.value = false;
        },
    });
}

/* ---------- Editar ---------- */
const editingId = ref(null);
const editForm = useForm({ label: '', platform: '' });

function startEditing(account) {
    deletingId.value = null;
    editForm.clearErrors();
    editForm.label = account.label;
    editForm.platform = account.platform;
    editingId.value = account.id;
}

function saveEdit(account) {
    editForm.put(`/riot-accounts/${account.id}`, {
        preserveScroll: true,
        onSuccess: () => (editingId.value = null),
    });
}

/* ---------- Actualizar nombre y eliminar ---------- */
const deletingId = ref(null);
const busy = ref(null); // "sync-3" o "delete-3"

function startDeleting(account) {
    editingId.value = null;
    deletingId.value = account.id;
}

function syncAccount(account) {
    router.post(
        `/riot-accounts/${account.id}/sync`,
        {},
        {
            preserveScroll: true,
            onStart: () => (busy.value = `sync-${account.id}`),
            onFinish: () => (busy.value = null),
        },
    );
}

function deleteAccount(account) {
    router.delete(`/riot-accounts/${account.id}`, {
        preserveScroll: true,
        onStart: () => (busy.value = `delete-${account.id}`),
        onFinish: () => (busy.value = null),
        onSuccess: () => (deletingId.value = null),
    });
}
</script>

<template>
    <Head title="Cuentas" />

    <div class="lol-container">
        <PageHeader
            title="Cuentas"
            subtitle="Las cuentas de League of Legends que sigue tu diario."
        />

        <FlashNotice :success="successMessage" :error="errorMessage" />

        <section>
            <h2 class="lol-section-title">Añadir cuenta</h2>

            <div class="lol-panel lol-rise">
                <form class="lol-form-row" @submit.prevent="submitAdd">
                    <div class="lol-field">
                        <label class="lol-label" for="riot_id">Riot ID</label>
                        <input
                            id="riot_id"
                            v-model="addForm.riot_id"
                            type="text"
                            class="lol-input"
                            placeholder="Nombre#TAG"
                            maxlength="40"
                            autocomplete="off"
                            spellcheck="false"
                            required
                        />
                        <p v-if="addForm.errors.riot_id" class="lol-error">
                            {{ addForm.errors.riot_id }}
                        </p>
                    </div>

                    <div class="lol-field">
                        <label class="lol-label" for="new_label">
                            Etiqueta
                        </label>
                        <input
                            id="new_label"
                            v-model="addForm.label"
                            type="text"
                            class="lol-input"
                            placeholder="main"
                            maxlength="30"
                            required
                            @input="labelTouched = true"
                        />
                        <p v-if="addForm.errors.label" class="lol-error">
                            {{ addForm.errors.label }}
                        </p>
                    </div>

                    <div class="lol-field">
                        <label class="lol-label" for="new_platform">
                            Servidor
                        </label>
                        <select
                            id="new_platform"
                            v-model="addForm.platform"
                            class="lol-input"
                        >
                            <option
                                v-for="platform in platforms"
                                :key="platform.value"
                                :value="platform.value"
                            >
                                {{ platform.label }}
                            </option>
                        </select>
                        <p v-if="addForm.errors.platform" class="lol-error">
                            {{ addForm.errors.platform }}
                        </p>
                    </div>

                    <button
                        type="submit"
                        class="lol-btn-primary lol-btn-inline"
                        :disabled="addForm.processing || atLimit"
                    >
                        {{ addForm.processing ? 'Verificando...' : 'Añadir' }}
                    </button>
                </form>

                <p class="lol-hint">
                    Verificamos la cuenta con Riot antes de guardarla. Tienes
                    {{ accounts.length }} de {{ maxAccounts }} cuentas.
                </p>
            </div>
        </section>

        <section>
            <h2 class="lol-section-title">Tus cuentas</h2>

            <div v-if="accounts.length === 0" class="lol-panel text-sm">
                Aún no tienes cuentas. Añade la primera arriba.
            </div>

            <div
                v-else
                class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
                <AccountCard
                    v-for="(account, i) in accounts"
                    :key="account.id"
                    :account="account"
                    :platform="platformLabel(account.platform)"
                    class="lol-rise"
                    :style="{ animationDelay: `${i * 70}ms` }"
                >
                    <template #meta>
                        · <strong>{{ account.notes_count }}</strong> notas
                    </template>

                    <span
                        class="lol-badge"
                        :class="{ 'lol-badge--win': account.verified }"
                        :title="
                            account.verified
                                ? 'Verificada con Riot'
                                : 'Se verificará al importar partidas o al actualizar el nombre'
                        "
                    >
                        {{ account.verified ? 'Verificada' : 'Sin verificar' }}
                    </span>

                    <!-- Editar -->
                    <form
                        v-if="editingId === account.id"
                        class="lol-inline-form"
                        @submit.prevent="saveEdit(account)"
                    >
                        <div class="lol-field">
                            <label
                                class="lol-label"
                                :for="`label-${account.id}`"
                            >
                                Etiqueta
                            </label>
                            <input
                                :id="`label-${account.id}`"
                                v-model="editForm.label"
                                type="text"
                                class="lol-input"
                                maxlength="30"
                                required
                            />
                            <p v-if="editForm.errors.label" class="lol-error">
                                {{ editForm.errors.label }}
                            </p>
                        </div>

                        <div class="lol-field">
                            <label
                                class="lol-label"
                                :for="`platform-${account.id}`"
                            >
                                Servidor
                            </label>
                            <select
                                :id="`platform-${account.id}`"
                                v-model="editForm.platform"
                                class="lol-input"
                            >
                                <option
                                    v-for="platform in platforms"
                                    :key="platform.value"
                                    :value="platform.value"
                                >
                                    {{ platform.label }}
                                </option>
                            </select>
                            <p
                                v-if="editForm.errors.platform"
                                class="lol-error"
                            >
                                {{ editForm.errors.platform }}
                            </p>
                        </div>

                        <div class="lol-card-actions">
                            <button
                                type="submit"
                                class="lol-btn-primary lol-btn-inline"
                                :disabled="editForm.processing"
                            >
                                {{
                                    editForm.processing
                                        ? 'Guardando...'
                                        : 'Guardar'
                                }}
                            </button>
                            <button
                                type="button"
                                class="lol-btn"
                                @click="editingId = null"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>

                    <!-- Confirmar eliminación -->
                    <div
                        v-else-if="deletingId === account.id"
                        class="lol-confirm"
                        role="alert"
                    >
                        <p>
                            Vas a eliminar <strong>{{ account.label }}</strong
                            >. Se borrarán sus
                            <strong>{{ account.matches_count }}</strong>
                            partidas y
                            <strong>{{ account.notes_count }}</strong> notas del
                            diario.
                        </p>
                        <p v-if="account.notes_count > 0">
                            Las notas no se pueden recuperar, ni siquiera
                            volviendo a añadir la cuenta.
                        </p>
                        <p v-else>No se puede deshacer.</p>

                        <div class="lol-card-actions">
                            <button
                                type="button"
                                class="lol-btn lol-btn--danger"
                                :disabled="busy !== null"
                                @click="deleteAccount(account)"
                            >
                                <Trash2 :size="14" />
                                {{
                                    busy === `delete-${account.id}`
                                        ? 'Eliminando...'
                                        : 'Sí, eliminar'
                                }}
                            </button>
                            <button
                                type="button"
                                class="lol-btn"
                                @click="deletingId = null"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>

                    <!-- Acciones -->
                    <div v-else class="lol-card-actions">
                        <button
                            type="button"
                            class="lol-btn"
                            @click="startEditing(account)"
                        >
                            <Pencil :size="14" />
                            Editar
                        </button>
                        <button
                            type="button"
                            class="lol-btn"
                            :disabled="busy !== null"
                            title="Pregunta a Riot el nombre actual de esta cuenta"
                            @click="syncAccount(account)"
                        >
                            <RefreshCw
                                :size="14"
                                :class="{
                                    'lol-spin': busy === `sync-${account.id}`,
                                }"
                            />
                            {{
                                busy === `sync-${account.id}`
                                    ? 'Consultando...'
                                    : 'Actualizar nombre'
                            }}
                        </button>
                        <button
                            type="button"
                            class="lol-btn lol-btn--danger"
                            @click="startDeleting(account)"
                        >
                            <Trash2 :size="14" />
                            Eliminar
                        </button>
                    </div>
                </AccountCard>
            </div>
        </section>
    </div>
</template>
