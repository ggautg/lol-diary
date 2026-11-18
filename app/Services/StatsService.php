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
     * Todo lo que necesita el panel de estadísticas, en una sola llamada.
     *
     * @return array<string, mixed>
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

    /**
     * Resumen global: partidas jugadas, victorias, derrotas y winrate.
     *
     * @return array{games: int, wins: int, losses: int, winrate: float}
     */
    public function overview(User $user, ?int $accountId = null): array
    {
        $row = (array) $this->baseQuery($user, $accountId)
            ->toBase()
            ->selectRaw('COUNT(*) as games, COALESCE(SUM(lol_matches.win), 0) as wins')
            ->first();

        return $this->winrate((int) ($row['games'] ?? 0), (int) ($row['wins'] ?? 0));
    }

    /**
     * Rendimiento agrupado por campeón.
     *
     * @return Collection<int, array{champion: mixed, games: int, wins: int, losses: int, winrate: float, kda: float, avg_damage: int}>
     */
    public function byChampion(User $user, ?int $accountId = null): Collection
    {
        return $this->baseQuery($user, $accountId)
            ->toBase()
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
            ->map(function (object $row): array {
                $row = (array) $row;

                return [
                    'champion' => $row['champion'],
                    ...$this->winrate((int) $row['games'], (int) $row['wins']),
                    'kda' => round(($row['total_kills'] + $row['total_assists']) / max($row['total_deaths'], 1), 2),
                    'avg_damage' => (int) round($row['avg_damage']),
                ];
            });
    }

    /**
     * Rendimiento agrupado por estado de ánimo.
     *
     * @return Collection<int, array{mood: mixed, games: int, wins: int, losses: int, winrate: float}>
     */
    public function byMood(User $user, ?int $accountId = null): Collection
    {
        return $this->baseQuery($user, $accountId)
            ->toBase()
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
            ->map(function (object $row): array {
                $row = (array) $row;

                return [
                    'mood' => $row['mood'],
                    ...$this->winrate((int) $row['games'], (int) $row['wins']),
                ];
            });
    }

    /**
     * Rendimiento por hora local del día.
     *
     * Se agrupa en PHP a propósito: la hora depende de la zona horaria
     * configurada y no conviene depender de las funciones de MySQL.
     *
     * @return Collection<int, array{hour: int, games: int, wins: int, losses: int, winrate: float}>
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

    /**
     * Rendimiento agrupado por etiqueta del diario.
     *
     * @return Collection<int, array{name: mixed, games: int, wins: int, losses: int, winrate: float}>
     */
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
            ->map(function (object $row): array {
                $row = (array) $row;

                return [
                    'name' => $row['name'],
                    ...$this->winrate((int) $row['games'], (int) $row['wins']),
                ];
            });
    }

    /**
     * Solo partidas de las cuentas del propio usuario, opcionalmente una sola.
     *
     * @return Builder<LolMatch>
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

    /**
     * Calcula las métricas derivadas a partir de partidas y victorias.
     *
     * @return array{games: int, wins: int, losses: int, winrate: float}
     */
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
