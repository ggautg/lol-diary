<script setup>
/**
 * Estructura común de todas las pantallas autenticadas: cabecera con
 * navegación principal, contenido y aviso legal de Riot.
 */
import { Link, router, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import ThemeSwitcher from '@/components/ThemeSwitcher.vue';
import { canInstall, promptInstall } from '@/lib/installPrompt';

const page = usePage();

const items = [
    { label: 'Partidas', href: '/diary' },
    { label: 'Calendario', href: '/diary/calendar' },
    { label: 'Estadísticas', href: '/diary/stats' },
    { label: 'Falencias', href: '/diary/weaknesses' },
    { label: 'Cuentas', href: '/diary/accounts' },
    { label: 'Ajustes', href: '/settings/profile' },
];

// page.url incluye la cadena de consulta (?month=...): comparamos solo la ruta.
const currentPath = computed(() => page.url.split('?')[0]);

const userName = computed(() => page.props.auth?.user?.name ?? '');

function logout() {
    router.post('/logout');
}
</script>

<template>
    <div class="lol-app">
        <header class="lol-header">
            <div class="lol-header-inner">
                <Link href="/diary/calendar" class="lol-brand">LoL Diary</Link>

                <nav class="lol-nav" aria-label="Principal">
                    <Link
                        v-for="item in items"
                        :key="item.href"
                        :href="item.href"
                        :aria-current="
                            currentPath === item.href ? 'page' : undefined
                        "
                    >
                        {{ item.label }}
                    </Link>
                </nav>

                <div class="lol-user">
                    <span>{{ userName }}</span>
                    <ThemeSwitcher />
                    <button
                        v-if="canInstall"
                        type="button"
                        @click="promptInstall"
                    >
                        Instalar app
                    </button>
                    <button type="button" @click="logout">Salir</button>
                </div>
            </div>
        </header>

        <main>
            <slot />
        </main>

        <footer class="lol-footer">
            LoL Diary no está avalado por Riot Games ni refleja las opiniones de
            Riot Games o de cualquier persona involucrada en la producción o
            gestión de las propiedades de Riot Games. Riot Games y todas sus
            propiedades asociadas son marcas comerciales o marcas registradas
            de Riot Games, Inc.
        </footer>
    </div>
</template>
