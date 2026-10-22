const ROLE_LABELS = {
    TOP: 'Top',
    JUNGLE: 'Jungla',
    MIDDLE: 'Mid',
    BOTTOM: 'Bot',
    UTILITY: 'Support',
};

export function roleLabel(role) {
    return role ? (ROLE_LABELS[role] ?? role) : '—';
}

export function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const rest = String(seconds % 60).padStart(2, '0');

    return `${minutes}:${rest}`;
}

export function kdaRatio(kills, deaths, assists) {
    return deaths === 0 ? 'Perfect' : ((kills + assists) / deaths).toFixed(2);
}

export function csPerMinute(cs, durationSeconds) {
    return durationSeconds === 0
        ? '0.0'
        : (cs / (durationSeconds / 60)).toFixed(1);
}

export function formatMatchDate(iso) {
    return new Date(iso).toLocaleString('es-PY', {
        dateStyle: 'short',
        timeStyle: 'short',
    });
}
