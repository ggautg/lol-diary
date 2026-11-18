<script setup>
/**
 * Gestión de passkeys: listado, borrado y alta de nuevas.
 * Una passkey permite iniciar sesión sin escribir la contraseña.
 */
import { router } from '@inertiajs/vue3';
import { KeyRound } from '@lucide/vue';
import PasskeyItem from '@/components/PasskeyItem.vue';
import PasskeyRegister from '@/components/PasskeyRegister.vue';
import { destroy } from '@/actions/Laravel/Passkeys/Http/Controllers/PasskeyRegistrationController';

defineProps({
    canManagePasskeys: { type: Boolean, default: false },
    passkeys: { type: Array, default: () => [] },
});

const handleDelete = (id, onError) => {
    router.delete(destroy.url(id), {
        preserveScroll: true,
        onError,
    });
};

const handleRegisterSuccess = () => {
    router.reload();
};
</script>

<template>
    <div v-if="canManagePasskeys" class="lol-settings-section">
        <h2 class="lol-settings-heading">Passkeys</h2>
        <p class="lol-muted">
            Inicia sesión con la huella, el rostro o el PIN de este dispositivo,
            sin escribir la contraseña.
        </p>

        <div class="lol-panel !p-0">
            <template v-if="passkeys.length">
                <PasskeyItem
                    v-for="passkey in passkeys"
                    :key="passkey.id"
                    :passkey="passkey"
                    @remove="handleDelete"
                />
            </template>

            <div v-else class="p-8 text-center">
                <div
                    class="mx-auto mb-4 flex h-14 w-14 items-center justify-center border border-[var(--lol-border-dim)]"
                >
                    <KeyRound class="h-7 w-7 opacity-60" />
                </div>
                <p class="font-medium">Todavía no tienes passkeys</p>
                <p class="lol-muted mt-1">
                    Añade una para entrar sin contraseña.
                </p>
            </div>
        </div>

        <PasskeyRegister @success="handleRegisterSuccess" />
    </div>
</template>
