<?php

namespace App\Models;

use App\Enums\Mood;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Carbon;

/**
 * Nota personal de una partida: estado de ánimo, qué pasó y qué mejorar.
 * Se borra junto con su partida y comparte etiquetas con el resto del diario.
 *
 * @property int $id
 * @property int $lol_match_id
 * @property Mood|null $mood
 * @property string|null $notes
 * @property string|null $lesson
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read LolMatch $lolMatch
 * @property-read Collection<int, Tag> $tags
 */
class DiaryEntry extends Model
{
    /** Los campos llegan validados desde el controlador. */
    protected $guarded = [];

    /**
     * El ánimo se guarda como texto y se expone como enum Mood.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'mood' => Mood::class,
        ];
    }

    /**
     * Partida a la que pertenece la nota.
     *
     * @return BelongsTo<LolMatch, $this>
     */
    public function lolMatch(): BelongsTo
    {
        return $this->belongsTo(LolMatch::class);
    }

    /**
     * Etiquetas elegidas para esta nota.
     *
     * @return BelongsToMany<Tag, $this>
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }
}
