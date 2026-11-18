/**
 * Utilidades compartidas por las pantallas del diario.
 * Centralizar aquí los textos y formatos evita duplicar etiquetas
 * (roles, ánimos, fechas) en cada componente.
 */

const ROLE_LABELS = {
    TOP: 'Top',
    JUNGLE: 'Jungla',
    MIDDLE: 'Mid',
    BOTTOM: 'Bot',
    UTILITY: 'Soporte',
};

/** Estados de ánimo que se pueden anotar en una partida. */
export const MOODS = [
    { value: 'focused', label: 'Concentrado' },
    { value: 'calm', label: 'Tranquilo' },
    { value: 'hyped', label: 'Motivado' },
    { value: 'tired', label: 'Cansado' },
    { value: 'tilted', label: 'Tilteado' },
];

/** Devuelve la etiqueta en español de un rol de Riot. */
export function roleLabel(role) {
    return role ? (ROLE_LABELS[role] ?? role) : '—';
}

/** Devuelve la etiqueta en español de un estado de ánimo. */
export function moodLabel(value) {
    return MOODS.find((mood) => mood.value === value)?.label ?? '';
}

/** Convierte segundos a "minutos:segundos". */
export function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const rest = String(seconds % 60).padStart(2, '0');

    return `${minutes}:${rest}`;
}

/** KDA con dos decimales; sin muertes se considera perfecto. */
export function kdaRatio(kills, deaths, assists) {
    return deaths === 0 ? 'Perfecto' : ((kills + assists) / deaths).toFixed(2);
}

/** CS por minuto con un decimal. */
export function csPerMinute(cs, durationSeconds) {
    return durationSeconds === 0
        ? '0.0'
        : (cs / (durationSeconds / 60)).toFixed(1);
}

/** Fecha y hora local de una partida. */
export function formatMatchDate(iso) {
    return new Date(iso).toLocaleString('es-PY', {
        dateStyle: 'short',
        timeStyle: 'short',
    });
}

/** Número con separadores locales y decimales opcionales. */
export function formatNumber(value, decimals = 0) {
    return Number(value).toLocaleString('es-PY', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
}
