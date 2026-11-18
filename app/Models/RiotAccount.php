<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * Cuenta de League of Legends seguida por un usuario.
 *
 * `puuid` es el identificador estable de Riot: se rellena al verificar la
 * cuenta y permite encontrar al jugador aunque cambie de nombre. El Riot ID
 * visible vive en `game_name` y `tag_line`.
 *
 * @property int $id
 * @property int $user_id
 * @property string $label
 * @property string $game_name
 * @property string $tag_line
 * @property string $platform
 * @property string|null $puuid
 * @property int $matches_count
 * @property int $notes_count
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read User $user
 * @property-read Collection<int, LolMatch> $matches
 */
class RiotAccount extends Model
{
    /** Todos los campos llegan validados desde el controlador. */
    protected $guarded = [];

    /**
     * Usuario dueño de la cuenta.
     *
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Partidas importadas de esta cuenta.
     *
     * @return HasMany<LolMatch, $this>
     */
    public function matches(): HasMany
    {
        return $this->hasMany(LolMatch::class);
    }
}
