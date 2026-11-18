<script setup>
/**
 * Zona de peligro del perfil: elimina la cuenta y todos sus datos.
 * Pide la contraseña en un diálogo de confirmación antes de borrar.
 */
import { Form } from '@inertiajs/vue3';
import { TriangleAlert } from 'lucide-vue-next';
import { useTemplateRef } from 'vue';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

const passwordInput = useTemplateRef('passwordInput');
</script>

<template>
    <div class="lol-settings-section">
        <h2 class="lol-settings-heading">Eliminar cuenta</h2>
        <p class="lol-muted">
            Borra tu cuenta y todos los datos guardados en el diario.
        </p>

        <div class="lol-confirm">
            <p class="flex items-center gap-2 font-semibold">
                <TriangleAlert :size="16" aria-hidden="true" />
                Esto no se puede deshacer
            </p>
            <p>
                Se eliminarán tus cuentas de Riot, partidas importadas, notas y
                etiquetas.
            </p>

            <Dialog>
                <DialogTrigger as-child>
                    <button
                        type="button"
                        class="lol-btn lol-btn--danger"
                        data-test="delete-user-button"
                    >
                        Eliminar mi cuenta
                    </button>
                </DialogTrigger>

                <DialogContent>
                    <Form
                        v-bind="ProfileController.destroy.form()"
                        reset-on-success
                        :options="{ preserveScroll: true }"
                        class="lol-form"
                        v-slot="{ errors, processing, reset, clearErrors }"
                        @error="() => passwordInput?.focus()"
                    >
                        <DialogHeader class="space-y-3">
                            <DialogTitle>
                                ¿Seguro que quieres eliminar tu cuenta?
                            </DialogTitle>
                            <DialogDescription>
                                Al eliminarla se borrarán también todas tus
                                cuentas, partidas y notas. Escribe tu contraseña
                                para confirmar.
                            </DialogDescription>
                        </DialogHeader>

                        <div class="lol-field">
                            <label class="lol-label sr-only" for="password">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                ref="passwordInput"
                                name="password"
                                type="password"
                                class="lol-input"
                                placeholder="Tu contraseña"
                                autocomplete="current-password"
                            />
                            <p v-if="errors.password" class="lol-error">
                                {{ errors.password }}
                            </p>
                        </div>

                        <DialogFooter class="gap-2">
                            <DialogClose as-child>
                                <button
                                    type="button"
                                    class="lol-btn"
                                    @click="
                                        () => {
                                            clearErrors();
                                            reset();
                                        }
                                    "
                                >
                                    Cancelar
                                </button>
                            </DialogClose>

                            <button
                                type="submit"
                                class="lol-btn lol-btn--danger"
                                :disabled="processing"
                                data-test="confirm-delete-user-button"
                            >
                                {{
                                    processing
                                        ? 'Eliminando...'
                                        : 'Eliminar cuenta'
                                }}
                            </button>
                        </DialogFooter>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    </div>
</template>
