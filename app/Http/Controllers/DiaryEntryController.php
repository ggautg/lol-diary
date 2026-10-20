<?php

namespace App\Http\Controllers;

use App\Enums\Mood;
use App\Models\LolMatch;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class DiaryEntryController extends Controller
{
    public function update(Request $request, LolMatch $lolMatch): RedirectResponse
    {
        abort_unless($lolMatch->riotAccount->user_id === $request->user()->id, 403);

        $data = $request->validate([
            'mood' => ['nullable', Rule::enum(Mood::class)],
            'notes' => ['nullable', 'string', 'max:5000'],
            'lesson' => ['nullable', 'string', 'max:2000'],
            'tags' => ['nullable', 'array', 'max:10'],
            'tags.*' => ['nullable', 'string', 'max:50'],
        ]);

        // Normalize BEFORE searching: the Tag mutator only runs when saving
        $tagNames = collect($data['tags'] ?? [])
            ->map(fn ($name) => mb_strtolower(trim((string) $name)))
            ->filter()
            ->unique()
            ->values();

        $fields = Arr::only($data, ['mood', 'notes', 'lesson']);

        // Nothing written and no tags: remove the entry instead of keeping an empty row
        if ($tagNames->isEmpty() && array_filter($fields, 'filled') === []) {
            $lolMatch->diaryEntry()->delete();

            return back()->with('success', 'Nota eliminada.');
        }

        DB::transaction(function () use ($request, $lolMatch, $fields, $tagNames) {
            $entry = $lolMatch->diaryEntry()->updateOrCreate([], $fields);

            $tagIds = $tagNames
                ->map(fn (string $name) => $request->user()->tags()->firstOrCreate(['name' => $name])->id)
                ->all();

            $entry->tags()->sync($tagIds);
        });

        return back()->with('success', 'Nota guardada.');
    }
}