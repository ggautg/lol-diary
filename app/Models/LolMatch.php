<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class LolMatch extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'win' => 'boolean',
            'played_at' => 'datetime',
            'raw' => 'array',
        ];
    }

    public function riotAccount(): BelongsTo
    {
        return $this->belongsTo(RiotAccount::class);
    }

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

    public function diaryEntry(): HasOne
    {
        return $this->hasOne(DiaryEntry::class);
    }
}