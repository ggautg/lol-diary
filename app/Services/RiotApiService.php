<?php

namespace App\Services;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;
use InvalidArgumentException;

class RiotApiService
{
    /**
     * Resolve a Riot ID (name#tag) into account data, including the puuid.
     */
    public function getAccountByRiotId(string $gameName, string $tagLine, string $platform): array
    {
        $path = sprintf(
            '/riot/account/v1/accounts/by-riot-id/%s/%s',
            rawurlencode($gameName),
            rawurlencode($tagLine),
        );

        return $this->client($platform)->get($path)->throw()->json();
    }

    /**
     * Get the latest match ids (newest first) for a puuid.
     *
     * @return string[]
     */
    public function getMatchIds(string $puuid, string $platform, int $count = 20, int $start = 0): array
    {
        $path = "/lol/match/v5/matches/by-puuid/{$puuid}/ids";

        return $this->client($platform)
            ->get($path, ['start' => $start, 'count' => $count])
            ->throw()
            ->json();
    }

    /**
     * Get the full detail of a single match.
     */
    public function getMatch(string $matchId, string $platform): array
    {
        return $this->client($platform)
            ->get("/lol/match/v5/matches/{$matchId}")
            ->throw()
            ->json();
    }

    private function client(string $platform): PendingRequest
    {
        $region = config("riot.regions.{$platform}")
            ?? throw new InvalidArgumentException("Unknown platform: {$platform}");

        return Http::baseUrl("https://{$region}.api.riotgames.com")
            ->withHeaders(['X-Riot-Token' => config('riot.api_key')])
            ->acceptJson()
            ->timeout(10);
    }
}