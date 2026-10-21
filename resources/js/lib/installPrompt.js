import { ref } from 'vue';

export const canInstall = ref(false);

// The browser fires "beforeinstallprompt" once and early: keep the event to use it later
let deferred = null;

if (typeof window !== 'undefined') {
    window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        deferred = event;
        canInstall.value = true;
    });

    window.addEventListener('appinstalled', () => {
        deferred = null;
        canInstall.value = false;
    });
}

export async function promptInstall() {
    if (deferred === null) {
        return;
    }

    await deferred.prompt();
    await deferred.userChoice;

    deferred = null; // the event can only be used once
    canInstall.value = false;
}