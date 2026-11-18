<script setup>
/**
 * Fila de una passkey registrada, con su diálogo de borrado.
 */
import { KeyRound, Trash2 } from '@lucide/vue';
import { ref } from 'vue';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

const props = defineProps({
    passkey: { type: Object, required: true },
});

const emit = defineEmits(['remove']);
const isDeleting = ref(false);

const handleDelete = () => {
    isDeleting.value = true;
    emit('remove', props.passkey.id, () => {
        isDeleting.value = false;
    });
};
</script>

<template>
    <div
        class="flex items-center justify-between gap-4 border-b border-[var(--lol-border-dim)] p-4 last:border-b-0"
    >
        <div class="flex items-center gap-4">
            <div
                class="flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--lol-border-dim)]"
            >
                <KeyRound class="h-5 w-5 opacity-60" />
            </div>
            <div class="space-y-1">
                <div class="flex flex-wrap items-center gap-2.5">
                    <p class="font-medium tracking-tight">
                        {{ passkey.name }}
                    </p>
                    <span v-if="passkey.authenticator" class="lol-badge">
                        {{ passkey.authenticator }}
                    </span>
                </div>
                <p class="lol-muted">
                    Añadida {{ passkey.created_at_diff }}
                    <template v-if="passkey.last_used_at_diff">
                        · Último uso {{ passkey.last_used_at_diff }}
                    </template>
                </p>
            </div>
        </div>

        <Dialog>
            <DialogTrigger as-child>
                <button
                    type="button"
                    class="lol-btn lol-btn--danger"
                    title="Quitar passkey"
                >
                    <Trash2 class="h-4 w-4" />
                    <span class="sr-only">Quitar</span>
                </button>
            </DialogTrigger>

            <DialogContent>
                <DialogTitle>Quitar passkey</DialogTitle>
                <DialogDescription>
                    ¿Seguro que quieres quitar la passkey
                    «{{ passkey.name }}»? Ya no podrás usarla para iniciar
                    sesión.
                </DialogDescription>
                <DialogFooter class="gap-2">
                    <DialogClose as-child>
                        <button type="button" class="lol-btn">Cancelar</button>
                    </DialogClose>
                    <button
                        type="button"
                        class="lol-btn lol-btn--danger"
                        :disabled="isDeleting"
                        @click="handleDelete"
                    >
                        {{
                            isDeleting ? 'Quitando...' : 'Quitar passkey'
                        }}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>
