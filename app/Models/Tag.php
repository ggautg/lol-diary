<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Carbon;

/**
 * Etiqueta personal del diario (por ejemplo «mal wardeo»).
 * Cada usuario tiene su propio conjunto y puede reutilizarlas en sus notas.
 *
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read User $user
 * @property-read Collection<int, DiaryEntry> $diaryEntries
 */
class Tag extends Model
{
    /** Los campos llegan validados desde el controlador. */
    protected $guarded = [];

    /**
     * Normaliza el nombre antes de guardarlo: sin espacios sobrantes y en
     * minúsculas, para que «Mal Wardeo» y «mal wardeo» sean la misma etiqueta.
     *
     * @return Attribute<string, string>
     */
    protected function name(): Attribute
    {
        return Attribute::set(fn (string $value) => mb_strtolower(trim($value)));
    }

    /**
     * Usuario dueño de la etiqueta.
     *
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Notas que usan esta etiqueta.
     *
     * @return BelongsToMany<DiaryEntry, $this>
     */
    public function diaryEntries(): BelongsToMany
    {
        return $this->belongsToMany(DiaryEntry::class);
    }
}
