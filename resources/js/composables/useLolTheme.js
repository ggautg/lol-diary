import { ref } from 'vue';

const STORAGE_KEY = 'lol-theme';
const COOKIE_NAME = 'lol_theme';
const DEFAULT_THEME = 'dark';

/**
 * Available palettes. `swatch` is the page background and `accent` the
 * metal/accent colour, both used to paint the preview chips.
 */
export const LOL_THEMES = [
    {
        id: 'dark',
        label: 'Oscuro',
        group: 'base',
        swatch: '#010a13',
        accent: '#c8aa6e',
    },
    {
        id: 'light',
        label: 'Claro',
        group: 'base',
        swatch: '#f7f3e7',
        accent: '#856417',
    },
    {
        id: 'demacia',
        label: 'Demacia',
        group: 'region',
        swatch: '#0b1522',
        accent: '#e0c68a',
    },
    {
        id: 'noxus',
        label: 'Noxus',
        group: 'region',
        swatch: '#1a0a0e',
        accent: '#c99a5b',
    },
    {
        id: 'ionia',
        label: 'Ionia',
        group: 'region',
        swatch: '#0a1d1c',
        accent: '#f08fa8',
    },
    {
        id: 'piltover',
        label: 'Piltover',
        group: 'region',
        swatch: '#0d1a26',
        accent: '#5fc7e8',
    },
    {
        id: 'zaun',
        label: 'Zaun',
        group: 'region',
        swatch: '#08170f',
        accent: '#7ce04f',
    },
    {
        id: 'freljord',
        label: 'Freljord',
        group: 'region',
        swatch: '#08182a',
        accent: '#b9d2e0',
    },
    {
        id: 'shurima',
        label: 'Shurima',
        group: 'region',
        swatch: '#1b1105',
        accent: '#d9ae5c',
    },
    {
        id: 'targon',
        label: 'Targon',
        group: 'region',
        swatch: '#101026',
        accent: '#a88bf0',
    },
    {
        id: 'bilgewater',
        label: 'Bilgewater',
        group: 'region',
        swatch: '#0a1d1b',
        accent: '#2fbfa8',
    },
    {
        id: 'shadow-isles',
        label: 'Islas Sombrías',
        group: 'region',
        swatch: '#07160f',
        accent: '#5ff0a8',
    },
    {
        id: 'ixtal',
        label: 'Ixtal',
        group: 'region',
        swatch: '#081d12',
        accent: '#4fd8a0',
    },
    {
        id: 'bandle-city',
        label: 'Bandle',
        group: 'region',
        swatch: '#101d12',
        accent: '#b07fe0',
    },
    {
        id: 'void',
        label: 'El Vacío',
        group: 'region',
        swatch: '#0d0620',
        accent: '#c46ff0',
    },
];

const THEME_IDS = new Set(LOL_THEMES.map((theme) => theme.id));
const LIGHT_THEME_ID = 'light';

const theme = ref(DEFAULT_THEME);

function isKnownTheme(value) {
    return typeof value === 'string' && THEME_IDS.has(value);
}

function readCookie(name) {
    if (typeof document === 'undefined') {
        return null;
    }

    const match = document.cookie.match(
        new RegExp(`(?:^|;\\s*)${name}=([^;]*)`),
    );

    return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name, value) {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = 365 * 24 * 60 * 60;

    document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=${maxAge};SameSite=Lax`;
}

function readStoredTheme() {
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);

        if (isKnownTheme(stored)) {
            return stored;
        }
    } catch {
        // Private mode or blocked storage: fall back to the cookie
    }

    const fromCookie = readCookie(COOKIE_NAME);

    return isKnownTheme(fromCookie) ? fromCookie : null;
}

/**
 * Repaints the document with the given palette. Region palettes are dark,
 * so `.dark` stays in sync for Tailwind variants and native widgets.
 */
export function applyLolTheme(id) {
    if (typeof document === 'undefined') {
        return DEFAULT_THEME;
    }

    const value = isKnownTheme(id) ? id : DEFAULT_THEME;

    theme.value = value;
    document.documentElement.dataset.theme = value;
    document.documentElement.classList.toggle('dark', value !== LIGHT_THEME_ID);

    // Keep the browser/PWA chrome colour in sync with the palette background
    const meta = document.querySelector('meta[name="theme-color"]');

    if (meta) {
        const background = getComputedStyle(document.documentElement)
            .getPropertyValue('--lol-black')
            .trim();

        if (background) {
            meta.setAttribute('content', background);
        }
    }

    return value;
}

export function setLolTheme(id) {
    const value = applyLolTheme(id);
    const appearance = value === LIGHT_THEME_ID ? 'light' : 'dark';

    if (typeof window !== 'undefined') {
        try {
            window.localStorage.setItem(STORAGE_KEY, value);
            window.localStorage.setItem('appearance', appearance);
        } catch {
            // Storage is optional; the cookies below still persist the choice
        }
    }

    writeCookie(COOKIE_NAME, value);
    writeCookie('appearance', appearance);

    return value;
}

/** Runs on boot, after the inline script already painted the stored theme. */
export function initializeLolTheme() {
    return applyLolTheme(readStoredTheme() ?? DEFAULT_THEME);
}

export function useLolTheme() {
    return {
        themes: LOL_THEMES,
        theme,
        setTheme: setLolTheme,
    };
}
