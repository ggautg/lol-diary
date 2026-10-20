<?php

namespace App\Services;

use App\Models\LolMatch;
use App\Models\RiotAccount;
use Illuminate\Support\Carbon;

class MatchImporter
{
    public function __construct(private RiotApiService $riot)
    {
    }

    /**
     * Import the latest matches of an account. Returns how many were new.
     */
    public function import(RiotAccount $account, int $count = 20): int
    {
        $this->ensurePuuid($account);

        $ids = $this->riot->getMatchIds($account->puuid, $account->platform, $count);

        $known = $account->matches()
            ->whereIn('riot_match_id', $ids)
            ->pluck('riot_match_id')
            ->all();

        $imported = 0;

        foreach (array_diff($ids, $known) as $matchId) {
            $data = $this->riot->getMatch($matchId, $account->platform);

            $me = collect($data['info']['participants'])
                ->firstWhere('puuid', $account->puuid);

            if ($me === null) {
                continue;
            }

            LolMatch::firstOrCreate(
                ['riot_account_id' => $account->id, 'riot_match_id' => $matchId],
                $this->map($data['info'], $me),
            );

            $imported++;
        }

        return $imported;
    }

    /**
     * Resolve the puuid the first time and store Riot's canonical name/tag.
     */
    private function ensurePuuid(RiotAccount $account): void
    {
        if ($account->puuid !== null) {
            return;
        }

        $data = $this->riot->getAccountByRiotId(
            $account->game_name,
            $account->tag_line,
            $account->platform,
        );

        $account->update([
            'puuid' => $data['puuid'],
            'game_name' => $data['gameName'],
            'tag_line' => $data['tagLine'],
        ]);
    }

    /**
     * Map a Riot participant into our lol_matches columns.
     */
    private function map(array $info, array $me): array
    {
        return [
            'queue_id' => $info['queueId'] ?? null,
            'champion' => $me['championName'],
            'role' => $me['teamPosition'] ?: null,
            'win' => $me['win'],
            'kills' => $me['kills'],
            'deaths' => $me['deaths'],
            'assists' => $me['assists'],
            'damage_dealt' => $me['totalDamageDealtToChampions'],
            'damage_taken' => $me['totalDamageTaken'],
            'gold_earned' => $me['goldEarned'],
            'cs' => $me['totalMinionsKilled'] + $me['neutralMinionsKilled'],
            'vision_score' => $me['visionScore'],
            'duration' => $info['gameDuration'],
            'played_at' => Carbon::createFromTimestampMs($info['gameStartTimestamp']),
            'raw' => $me,
        ];
    }
}