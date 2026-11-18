<script setup>
/**
 * Marco de la sección Ajustes: subnavegación lateral y aviso de éxito.
 * Se combina con DiaryLayout (ver app.js), así que no repite la cabecera
 * principal de la aplicación.
 */
import { Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import FlashNotice from '@/components/lol/FlashNotice.vue';
import PageHeader from '@/components/lol/PageHeader.vue';
import { useCurrentUrl } from '@/composables/useCurrentUrl';
import { edit as editAppearance } from '@/routes/appearance';
import { edit as editProfile } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';

const items = [
    { title: 'Perfil', href: editProfile() },
    { title: 'Seguridad', href: editSecurity() },
    { title: 'Apariencia', href: editAppearance() },
];

const { isCurrentOrParentUrl } = useCurrentUrl();

const page = usePage();
const success = computed(() => page.props.flash?.success);
</script>

<template>
    <div class="lol-container">
        <PageHeader
            title="Ajustes"
            subtitle="Tu perfil, la seguridad de la cuenta y la apariencia."
        />

        <FlashNotice :success="success" />

        <div class="lol-settings">
            <aside>
                <nav class="lol-settings-nav" aria-label="Ajustes">
                    <Link
                        v-for="item in items"
                        :key="item.title"
                        :href="item.href"
                        :aria-current="
                            isCurrentOrParentUrl(item.href) ? 'page' : undefined
                        "
                    >
                        {{ item.title }}
                    </Link>
                </nav>
            </aside>

            <section class="lol-settings-body">
                <slot />
            </section>
        </div>
    </div>
</template>
