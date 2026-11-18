<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Carbon;

/**
 * Partida importada desde Riot.
 *
 * Guarda solo los datos que usa el diario (campeón, KDA, daño, CS, duración
 * y resultado) y el JSON original de la API en `raw` por si hace falta
 * reinterpretarlo más adelante.
 *
 * @property int $id
 * @property int $riot_account_id
 * @property string $riot_match_id
 * @property int|null $queue_id
 * @property string $champion
 * @property string|null $role
 * @property bool $win
 * @property int $kills
 * @property int $deaths
 * @property int $assists
 * @property int $damage_dealt
 * @property int $damage_taken
 * @property int $gold_earned
 * @property int $cs
 * @property int $vision_score
 * @property int $duration
 * @property Carbon $played_at
 * @property array<string, mixed>|null $raw
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read RiotAccount $riotAccount
 * @property-read DiaryEntry|null $diaryEntry
 */
class LolMatch extends Model
{
    /** Todos los campos se rellenan desde el importador, sin lista blanca. */
    protected $guarded = [];

    /**
     * Conversiones de tipos: victoria a booleano, fecha a Carbon y JSON a array.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'win' => 'boolean',
            'played_at' => 'datetime',
            'raw' => 'array',
        ];
    }

    /**
     * Cuenta de Riot a la que pertenece la partida.
     *
     * @return BelongsTo<RiotAccount, $this>
     */
    public function riotAccount(): BelongsTo
    {
        return $this->belongsTo(RiotAccount::class);
    }

    /**
     * Nota del diario asociada (puede no existir).
     *
     * @return HasOne<DiaryEntry, $this>
     */
    public function diaryEntry(): HasOne
    {
        return $this->hasOne(DiaryEntry::class);
    }

    /**
     * Prepara la partida para las pantallas del diario (Inertia).
     *
     * Incluye la etiqueta de la cuenta y los datos de la nota si existe,
     * porque el frontend los muestra en la misma tarjeta.
     *
     * @return array<string, mixed>
     */
    public function toDiaryArray(): array
    {
        return [
            'id' => $this->id,
            'account_id' => $this->riot_account_id,
            'account_label' => $this->riotAccount->label,
            'champion' => $this->champion,
            'role' => $this->role,
            'win' => $this->win,
            'kills' => $this->kills,
            'deaths' => $this->deaths,
            'assists' => $this->assists,
            'damage_dealt' => $this->damage_dealt,
            'cs' => $this->cs,
            'duration' => $this->duration,
            'played_at' => $this->played_at,
            'has_entry' => $this->diaryEntry !== null,
            'mood' => $this->diaryEntry?->mood?->value,
            'notes' => $this->diaryEntry?->notes,
            'lesson' => $this->diaryEntry?->lesson,
            'tags' => $this->diaryEntry?->tags->pluck('name')->all() ?? [],
        ];
    }
}
