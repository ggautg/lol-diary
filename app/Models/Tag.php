<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    protected $guarded = [];

    // Always store tag names trimmed and lowercase
    protected function name(): Attribute
    {
        return Attribute::set(fn (string $value) => mb_strtolower(trim($value)));
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function diaryEntries(): BelongsToMany
    {
        return $this->belongsToMany(DiaryEntry::class);
    }
}