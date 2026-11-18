<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Throwable;

class DataDragon
{
    private const CACHE_KEY = 'ddragon.version';

    private const UNAVAILABLE = 'unavailable';

    /**
     * Latest Data Dragon version, or null if Riot's CDN is unreachable.
     */
    public function version(): ?string
    {
        $cached = Cache::get(self::CACHE_KEY);

        if ($cached !== null) {
            return $cached === self::UNAVAILABLE ? null : $cached;
        }

        try {
            $versions = Http::timeout(3)
                ->get('https://ddragon.leagueoflegends.com/api/versions.json')
                ->throw()
                ->json();

            // El primer elemento de la lista es siempre la versión más reciente.
            $version = is_array($versions) ? ($versions[0] ?? null) : null;
        } catch (Throwable) {
            $version = null;
        }

        if (! is_string($version) || $version === '') {
            // Negative caching: do not retry (and wait for the timeout) on every request
            Cache::put(self::CACHE_KEY, self::UNAVAILABLE, now()->addMinutes(5));

            return null;
        }

        Cache::put(self::CACHE_KEY, $version, now()->addHours(12));

        return $version;
    }
}
