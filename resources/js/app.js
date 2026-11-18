import { createInertiaApp } from '@inertiajs/vue3';
import { initializeTheme } from '@/composables/useAppearance';
import { initializeLolTheme } from '@/composables/useLolTheme';
import DiaryLayout from '@/layouts/DiaryLayout.vue';
import LolAuthLayout from '@/layouts/LolAuthLayout.vue';
import SettingsLayout from '@/layouts/settings/Layout.vue';
import { initializeFlashToast } from '@/lib/flashToast';
import '@fontsource/cinzel/600.css';
import '@fontsource/cinzel/700.css';
import '@fontsource/barlow/400.css';
import '@fontsource/barlow/500.css';
import '@fontsource/barlow/600.css';
import '@/lib/installPrompt';
const appName = import.meta.env.VITE_APP_NAME || 'LoL Diary';
void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name === 'Welcome':
                return null;
            case name.startsWith('auth/'):
                return LolAuthLayout;
            case name.startsWith('settings/'):
                return [DiaryLayout, SettingsLayout];
            default:
                return DiaryLayout;
        }
    },
    withApp: (app) => {
        app.directive('focus', {
            mounted: (el, shouldFocus) => {
                if (shouldFocus.value !== false) {
                    el.focus();
                }
            },
        });
    },
    progress: { color: '#c8aa6e' },
});
// This will set light / dark mode on page load...
initializeTheme();
// ...then the LoL palette (light/dark/regions) overrides it, if one is stored
initializeLolTheme();
// This will listen for flash toast data from the server...
initializeFlashToast();
