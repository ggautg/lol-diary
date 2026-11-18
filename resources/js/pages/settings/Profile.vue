<script setup>
/**
 * Ajustes del perfil: nombre y correo.
 * Solo el dueño de la cuenta puede cambiarlos; si el correo no está
 * verificado se ofrece reenviar el enlace de verificación.
 */
import { Form, Head, Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import DeleteUser from '@/components/DeleteUser.vue';
import { send } from '@/routes/verification';

const page = usePage();
const user = computed(() => page.props.auth.user);
</script>

<template>
    <Head title="Perfil" />

    <div class="lol-settings-section">
        <h2 class="lol-settings-heading">Perfil</h2>
        <p class="lol-muted">
            Actualiza tu nombre y la dirección de correo de la cuenta.
        </p>

        <Form
            v-bind="ProfileController.update.form()"
            class="lol-form"
            v-slot="{ errors, processing }"
        >
            <div class="lol-field">
                <label class="lol-label" for="name">Nombre</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    class="lol-input"
                    :default-value="user.name"
                    required
                    autocomplete="name"
                    placeholder="Tu nombre"
                />
                <p v-if="errors.name" class="lol-error">{{ errors.name }}</p>
            </div>

            <div class="lol-field">
                <label class="lol-label" for="email">Correo electrónico</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    class="lol-input"
                    :default-value="user.email"
                    required
                    autocomplete="username"
                    placeholder="tu@correo.com"
                />
                <p v-if="errors.email" class="lol-error">{{ errors.email }}</p>
            </div>

            <div v-if="page.props.mustVerifyEmail && !user.email_verified_at">
                <p class="lol-muted">
                    Tu correo todavía no está verificado.
                    <Link :href="send()" as="button" class="lol-link">
                        Reenviar el enlace de verificación
                    </Link>
                </p>

                <p
                    v-if="page.props.status === 'verification-link-sent'"
                    class="lol-notice mt-2"
                >
                    Te enviamos un enlace de verificación nuevo.
                </p>
            </div>

            <div class="lol-actions">
                <button
                    type="submit"
                    class="lol-btn-primary lol-btn-inline"
                    :disabled="processing"
                    data-test="update-profile-button"
                >
                    {{ processing ? 'Guardando...' : 'Guardar cambios' }}
                </button>
            </div>
        </Form>
    </div>

    <DeleteUser />
</template>
