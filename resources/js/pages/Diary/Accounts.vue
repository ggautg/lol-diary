<script setup lang="ts">
import { Head, router, useForm, usePage } from '@inertiajs/vue3';
import { Pencil, RefreshCw, Trash2 } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import DiaryLayout from '@/layouts/DiaryLayout.vue';

defineOptions({ layout: DiaryLayout });

interface Account {
    id: number;
    label: string;
    game_name: string;
    tag_line: string;
    platform: string;
    verified: boolean;
    matches_count: number;
    notes_count: number;
}

interface Platform {
    value: string;
    label: string;
}

const props = defineProps<{
    accounts: Account[];
    platforms: Platform[];
    maxAccounts: number;
}>();

const page = usePage();

const successMessage = computed(
    () => (page.props.flash as { success?: string } | undefined)?.success,
);
const errorMessage = computed(
    () => (page.props.errors as Record<string, string>)?.account,
);

function platformLabel(value: string): string {
    return props.platforms.find((p) => p.value === value)?.label ?? value.toUpperCase();
}

const atLimit = computed(() => props.accounts.length >= props.maxAccounts);

/* ---------- Add ---------- */
const addForm = useForm({
    riot_id: '',
    label: '',
    platform: props.platforms.find((p) => p.value === 'la2')?.value ?? props.platforms[0]?.value ?? 'la2',
});

function submitAdd() {
    addForm.post('/riot-accounts', {
        preserveScroll: true,
        onSuccess: () => addForm.reset('riot_id', 'label'),
    });
}

/* ---------- Edit ---------- */
const editingId = ref<number | null>(null);
const editForm = useForm({ label: '', platform: '' });

function startEditing(account: Account) {
    deletingId.value = null;
    editForm.clearErrors();
    editForm.label = account.label;
    editForm.platform = account.platform;
    editingId.value = account.id;
}

function saveEdit(account: Account) {
    editForm.put(`/riot-accounts/${account.id}`, {
        preserveScroll: true,
        onSuccess: () => (editingId.value = null),
    });
}

/* ---------- Sync & delete ---------- */
const deletingId = ref<number | null>(null);
const busy = ref<string | null>(null); // "sync-3", "delete-3"

function startDeleting(account: Account) {
    editingId.value = null;
    deletingId.value = account.id;
}

function syncAccount(account: Account) {
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

function deleteAccount(account: Account) {
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
        <header>
            <h1 class="lol-page-title">Cuentas</h1>
            <p class="lol-page-sub">Las cuentas de League of Legends que sigue tu diario.</p>
        </header>

        <p v-if="successMessage" class="lol-notice">{{ successMessage }}</p>
        <p v-if="errorMessage" class="lol-notice lol-notice--error">{{ errorMessage }}</p>

        <!-- Add -->
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
                        <p v-if="addForm.errors.riot_id" class="lol-error">{{ addForm.errors.riot_id }}</p>
                    </div>

                    <div class="lol-field">
                        <label class="lol-label" for="new_label">Etiqueta</label>
                        <input
                            id="new_label"
                            v-model="addForm.label"
                            type="text"
                            class="lol-input"
                            placeholder="main"
                            maxlength="30"
                            required
                        />
                        <p v-if="addForm.errors.label" class="lol-error">{{ addForm.errors.label }}</p>
                    </div>

                    <div class="lol-field">
                        <label class="lol-label" for="new_platform">Servidor</label>
                        <select id="new_platform" v-model="addForm.platform" class="lol-input">
                            <option v-for="p in platforms" :key="p.value" :value="p.value">{{ p.label }}</option>
                        </select>
                        <p v-if="addForm.errors.platform" class="lol-error">{{ addForm.errors.platform }}</p>
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
                    Verificamos la cuenta con Riot antes de guardarla.
                    Tienes {{ accounts.length }} de {{ maxAccounts }} cuentas.
                </p>
            </div>
        </section>

        <!-- List -->
        <section>
            <h2 class="lol-section-title">Tus cuentas</h2>

            <div v-if="accounts.length === 0" class="lol-panel text-sm">
                Aún no tienes cuentas. Añade la primera arriba.
            </div>

            <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <article
                    v-for="(account, i) in accounts"
                    :key="account.id"
                    class="lol-panel lol-rise"
                    :style="{ animationDelay: `${i * 70}ms` }"
                >
                    <div class="flex items-start justify-between gap-2">
                        <div class="min-w-0">
                            <p class="lol-account-label">{{ account.label }}</p>
                            <p class="lol-account-id">{{ account.game_name }}#{{ account.tag_line }}</p>
                        </div>
                        <span class="lol-badge">{{ platformLabel(account.platform) }}</span>
                    </div>

                    <p class="lol-account-count">
                        <strong>{{ account.matches_count }}</strong> partidas ·
                        <strong>{{ account.notes_count }}</strong> notas
                    </p>

                    <span
                        class="lol-badge"
                        :class="{ 'lol-badge--win': account.verified }"
                        :title="account.verified ? 'Verificada con Riot' : 'Se verificará al importar partidas o al actualizar el nombre'"
                    >
                        {{ account.verified ? 'Verificada' : 'Sin verificar' }}
                    </span>

                    <!-- Edit -->
                    <form
                        v-if="editingId === account.id"
                        class="lol-inline-form"
                        @submit.prevent="saveEdit(account)"
                    >
                        <div class="lol-field">
                            <label class="lol-label" :for="`label-${account.id}`">Etiqueta</label>
                            <input
                                :id="`label-${account.id}`"
                                v-model="editForm.label"
                                type="text"
                                class="lol-input"
                                maxlength="30"
                                required
                            />
                            <p v-if="editForm.errors.label" class="lol-error">{{ editForm.errors.label }}</p>
                        </div>

                        <div class="lol-field">
                            <label class="lol-label" :for="`platform-${account.id}`">Servidor</label>
                            <select :id="`platform-${account.id}`" v-model="editForm.platform" class="lol-input">
                                <option v-for="p in platforms" :key="p.value" :value="p.value">{{ p.label }}</option>
                            </select>
                            <p v-if="editForm.errors.platform" class="lol-error">{{ editForm.errors.platform }}</p>
                        </div>

                        <div class="lol-card-actions">
                            <button type="submit" class="lol-btn-primary lol-btn-inline" :disabled="editForm.processing">
                                {{ editForm.processing ? 'Guardando...' : 'Guardar' }}
                            </button>
                            <button type="button" class="lol-btn" @click="editingId = null">Cancelar</button>
                        </div>
                    </form>

                    <!-- Delete confirmation -->
                    <div v-else-if="deletingId === account.id" class="lol-confirm" role="alert">
                        <p>
                            Vas a eliminar <strong>{{ account.label }}</strong>. Se borrarán sus
                            <strong>{{ account.matches_count }}</strong> partidas y
                            <strong>{{ account.notes_count }}</strong> notas del diario.
                        </p>
                        <p v-if="account.notes_count > 0">
                            Las notas no se pueden recuperar, ni siquiera volviendo a añadir la cuenta.
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
                                {{ busy === `delete-${account.id}` ? 'Eliminando...' : 'Sí, eliminar' }}
                            </button>
                            <button type="button" class="lol-btn" @click="deletingId = null">Cancelar</button>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div v-else class="lol-card-actions">
                        <button type="button" class="lol-btn" @click="startEditing(account)">
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
                            <RefreshCw :size="14" :class="{ 'lol-spin': busy === `sync-${account.id}` }" />
                            {{ busy === `sync-${account.id}` ? 'Consultando...' : 'Actualizar nombre' }}
                        </button>
                        <button type="button" class="lol-btn lol-btn--danger" @click="startDeleting(account)">
                            <Trash2 :size="14" />
                            Eliminar
                        </button>
                    </div>
                </article>
            </div>
        </section>
    </div>
</template>