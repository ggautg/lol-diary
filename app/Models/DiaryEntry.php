<?php

namespace App\Models;

use App\Enums\Mood;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class DiaryEntry extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'mood' => Mood::class,
        ];
    }

    public function lolMatch(): BelongsTo
    {
        return $this->belongsTo(LolMatch::class);
    }

    public function tags(): BelongsToMany
{
    return $this->belongsToMany(Tag::class);
}
}