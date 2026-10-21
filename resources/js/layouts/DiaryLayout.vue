<script setup>
import { Link, router, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import { canInstall, promptInstall } from '@/lib/installPrompt';

const page = usePage();

const items = [
    { label: 'Calendario', href: '/diary/calendar' },
    { label: 'Estadísticas', href: '/diary/stats' },
    { label: 'Partidas', href: '/diary' },
    { label: 'Cuentas', href: '/diary/accounts' },
];

// page.url includes the query string (?month=...), so compare only the path
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
                    <Link v-for="item in items" :key="item.href" :href="item.href"
                        :aria-current="currentPath === item.href ? 'page' : undefined">
                        {{ item.label }}
                    </Link>
                </nav>

                <div class="lol-user">
                    <span>{{ userName }}</span>
                    <button v-if="canInstall" type="button" @click="promptInstall">Instalar app</button>
                    <button type="button" @click="logout">Salir</button>
                </div>
            </div>
        </header>

        <main>
            <slot />
        </main>

        <footer class="lol-footer">
            LoL Diary isn't endorsed by Riot Games and doesn't reflect the views or opinions of
            Riot Games or anyone officially involved in producing or managing Riot Games properties.
            Riot Games, and all associated properties are trademarks or registered trademarks of
            Riot Games, Inc.
        </footer>
    </div>
</template>