<?php

namespace App\Services;

use App\Models\LolMatch;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class StatsService
{
    /**
     * Everything the dashboard needs, in one call.
     */
    public function dashboard(User $user, ?int $accountId = null): array
    {
        return [
            'overview' => $this->overview($user, $accountId),
            'champions' => $this->byChampion($user, $accountId),
            'moods' => $this->byMood($user, $accountId),
            'hours' => $this->byHour($user, $accountId),
            'tags' => $this->byTag($user, $accountId),
        ];
    }

    public function overview(User $user, ?int $accountId = null): array
    {
        $row = $this->baseQuery($user, $accountId)
            ->selectRaw('COUNT(*) as games, COALESCE(SUM(lol_matches.win), 0) as wins')
            ->first();

        return $this->winrate((int) $row->games, (int) $row->wins);
    }

    public function byChampion(User $user, ?int $accountId = null): Collection
    {
        return $this->baseQuery($user, $accountId)
            ->selectRaw('
                lol_matches.champion as champion,
                COUNT(*) as games,
                SUM(lol_matches.win) as wins,
                SUM(lol_matches.kills) as total_kills,
                SUM(lol_matches.deaths) as total_deaths,
                SUM(lol_matches.assists) as total_assists,
                AVG(lol_matches.damage_dealt) as avg_damage
            ')
            ->groupBy('lol_matches.champion')
            ->orderByDesc('games')
            ->orderBy('champion')
            ->get()
            ->map(fn ($row) => [
                'champion' => $row->champion,
                ...$this->winrate((int) $row->games, (int) $row->wins),
                'kda' => round(($row->total_kills + $row->total_assists) / max($row->total_deaths, 1), 2),
                'avg_damage' => (int) round($row->avg_damage),
            ]);
    }

    public function byMood(User $user, ?int $accountId = null): Collection
    {
        return $this->baseQuery($user, $accountId)
            ->join('diary_entries', 'diary_entries.lol_match_id', '=', 'lol_matches.id')
            ->whereNotNull('diary_entries.mood')
            ->selectRaw('
                diary_entries.mood as mood,
                COUNT(*) as games,
                SUM(lol_matches.win) as wins
            ')
            ->groupBy('diary_entries.mood')
            ->orderByDesc('games')
            ->get()
            ->map(fn ($row) => [
                'mood' => $row->mood,
                ...$this->winrate((int) $row->games, (int) $row->wins),
            ]);
    }

    /**
     * Grouped in PHP on purpose: see the notes below.
     */
    public function byHour(User $user, ?int $accountId = null): Collection
    {
        $tz = config('diary.timezone');

        return $this->baseQuery($user, $accountId)
            ->get(['lol_matches.played_at', 'lol_matches.win'])
            ->groupBy(fn (LolMatch $match) => $match->played_at->copy()->setTimezone($tz)->hour)
            ->map(fn (Collection $group, int $hour) => [
                'hour' => $hour,
                ...$this->winrate($group->count(), $group->where('win', true)->count()),
            ])
            ->sortKeys()
            ->values();
    }

    public function byTag(User $user, ?int $accountId = null): Collection
    {
        return DB::table('tags')
            ->join('diary_entry_tag', 'diary_entry_tag.tag_id', '=', 'tags.id')
            ->join('diary_entries', 'diary_entries.id', '=', 'diary_entry_tag.diary_entry_id')
            ->join('lol_matches', 'lol_matches.id', '=', 'diary_entries.lol_match_id')
            ->where('tags.user_id', $user->id)
            ->when($accountId !== null, fn ($query) => $query->where('lol_matches.riot_account_id', $accountId))
            ->groupBy('tags.id', 'tags.name')
            ->selectRaw('tags.name as name, COUNT(*) as games, SUM(lol_matches.win) as wins')
            ->orderByDesc('games')
            ->orderBy('tags.name')
            ->get()
            ->map(fn ($row) => [
                'name' => $row->name,
                ...$this->winrate((int) $row->games, (int) $row->wins),
            ]);
    }

    /**
     * Only matches of the user's own accounts, optionally narrowed to one.
     */
    private function baseQuery(User $user, ?int $accountId): Builder
    {
        $query = LolMatch::query()
            ->whereIn('lol_matches.riot_account_id', $user->riotAccounts()->select('id'));

        if ($accountId !== null) {
            $query->where('lol_matches.riot_account_id', $accountId);
        }

        return $query;
    }

    private function winrate(int $games, int $wins): array
    {
        return [
            'games' => $games,
            'wins' => $wins,
            'losses' => $games - $wins,
            'winrate' => $games === 0 ? 0.0 : round($wins / $games * 100, 1),
        ];
    }
}