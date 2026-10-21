const ROLE_LABELS: Record<string, string> = {
    TOP: 'Top',
    JUNGLE: 'Jungla',
    MIDDLE: 'Mid',
    BOTTOM: 'Bot',
    UTILITY: 'Support',
};

export function roleLabel(role: string | null): string {
    return role ? (ROLE_LABELS[role] ?? role) : '—';
}

export function formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const rest = String(seconds % 60).padStart(2, '0');

    return `${minutes}:${rest}`;
}

export function kdaRatio(kills: number, deaths: number, assists: number): string {
    return deaths === 0 ? 'Perfect' : ((kills + assists) / deaths).toFixed(2);
}

export function csPerMinute(cs: number, durationSeconds: number): string {
    return durationSeconds === 0 ? '0.0' : (cs / (durationSeconds / 60)).toFixed(1);
}

export function formatMatchDate(iso: string): string {
    return new Date(iso).toLocaleString('es-PY', {
        dateStyle: 'short',
        timeStyle: 'short',
    });
}