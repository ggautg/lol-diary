<?php

namespace App\Services;

use App\Models\LolMatch;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class WeaknessService
{
    /**
     * Remakes and very short games do not say anything about the player.
     */
    private const MIN_DURATION = 300;

    /**
     * Below this many games a role is context, not a diagnosis.
     */
    private const MIN_ROLE_GAMES = 4;

    /**
     * A check below this severity is listed, but not sold as a priority.
     */
    private const WEAKNESS_THRESHOLD = 20;

    private const ROLE_LABELS = [
        'TOP' => 'Top',
        'JUNGLE' => 'Jungla',
        'MIDDLE' => 'Mid',
        'BOTTOM' => 'Bot',
        'UTILITY' => 'Support',
        'UNKNOWN' => 'Sin rol',
    ];

    /**
     * Improvement targets, by role. They are coaching references, not
     * absolute truths: the page explains this in the methodology section.
     */
    private const TARGETS = [
        'deaths_per_10' => [
            'TOP' => 1.2,
            'JUNGLE' => 1.2,
            'MIDDLE' => 1.2,
            'BOTTOM' => 1.2,
            'UTILITY' => 1.3,
            'UNKNOWN' => 1.2,
        ],
        'dead_time_pct' => [
            'TOP' => 7.0,
            'JUNGLE' => 7.0,
            'MIDDLE' => 7.0,
            'BOTTOM' => 7.0,
            'UTILITY' => 7.5,
            'UNKNOWN' => 7.0,
        ],
        'vision_per_min' => [
            'TOP' => 0.8,
            'JUNGLE' => 1.0,
            'MIDDLE' => 0.8,
            'BOTTOM' => 0.7,
            'UTILITY' => 2.0,
            'UNKNOWN' => 0.8,
        ],
        'cs_per_min' => [
            'TOP' => 6.5,
            'JUNGLE' => 5.5,
            'MIDDLE' => 7.0,
            'BOTTOM' => 7.0,
            'UTILITY' => 1.5,
            'UNKNOWN' => 5.5,
        ],
        'control_wards_per_game' => [
            'TOP' => 4.0,
            'JUNGLE' => 5.0,
            'MIDDLE' => 4.0,
            'BOTTOM' => 4.0,
            'UTILITY' => 8.0,
            'UNKNOWN' => 4.0,
        ],
        'high_death_pct' => [
            'TOP' => 10.0,
            'JUNGLE' => 10.0,
            'MIDDLE' => 10.0,
            'BOTTOM' => 10.0,
            'UTILITY' => 10.0,
            'UNKNOWN' => 10.0,
        ],
    ];

    public function analyze(User $user, ?int $accountId = null): array
    {
        $all = $this->baseQuery($user, $accountId)
            ->orderBy('played_at')
            ->get();

        $remakes = $all->filter(fn (LolMatch $match) => $match->duration < self::MIN_DURATION)->count();

        $matches = $all
            ->filter(fn (LolMatch $match) => $match->duration >= self::MIN_DURATION)
            ->values();

        if ($matches->isEmpty()) {
            return $this->emptyAnalysis($remakes);
        }

        $overall = $this->metrics($matches);
        $roles = $this->roles($matches);
        $reliableRoles = $roles->where('reliable', true);

        if ($reliableRoles->isEmpty()) {
            $candidates = array_merge(
                $this->overallChecks($overall, $roles),
                $this->generalChecks($matches, $overall),
            );
        } else {
            $candidates = array_merge(
                $reliableRoles
                    ->flatMap(fn (array $role) => $this->roleChecks($role))
                    ->all(),
                $this->generalChecks($matches, $overall),
            );
        }

        $headlines = $this->headlines($candidates);
        $weaknesses = array_values(array_filter(
            $headlines,
            fn (array $check) => $check['severity'] >= self::WEAKNESS_THRESHOLD,
        ));
        $strengths = $this->strengths($candidates);
        $score = $this->score($headlines);

        return [
            'games' => $overall['games'],
            'wins' => $overall['wins'],
            'winrate' => $overall['winrate'],
            'period' => [
                'from' => $matches->first()->played_at->copy()->setTimezone(config('diary.timezone'))->format('d/m/Y'),
                'to' => $matches->last()->played_at->copy()->setTimezone(config('diary.timezone'))->format('d/m/Y'),
            ],
            'remakes' => $remakes,
            'score' => $score,
            'diagnosis' => $this->diagnosis($weaknesses, $score, $overall['games']),
            'summary' => [
                'high' => count(array_filter($weaknesses, fn (array $check) => $check['severity'] >= 50)),
                'medium' => count(array_filter(
                    $weaknesses,
                    fn (array $check) => $check['severity'] >= 25 && $check['severity'] < 50,
                )),
                'low' => count(array_filter(
                    $weaknesses,
                    fn (array $check) => $check['severity'] >= self::WEAKNESS_THRESHOLD && $check['severity'] < 25,
                )),
                'strengths' => count($strengths),
            ],
            'weaknesses' => $weaknesses,
            'strengths' => $strengths,
            'areas' => $headlines,
            'roles' => $roles->all(),
            'main_role' => $roles->first(),
            'benchmarks' => $this->benchmarks(),
        ];
    }

    private function emptyAnalysis(int $remakes): array
    {
        return [
            'games' => 0,
            'wins' => 0,
            'winrate' => 0.0,
            'period' => null,
            'remakes' => $remakes,
            'score' => null,
            'diagnosis' => null,
            'summary' => [
                'high' => 0,
                'medium' => 0,
                'low' => 0,
                'strengths' => 0,
            ],
            'weaknesses' => [],
            'strengths' => [],
            'areas' => [],
            'roles' => [],
            'main_role' => null,
            'benchmarks' => $this->benchmarks(),
        ];
    }

    private function metrics(Collection $matches): array
    {
        $games = $matches->count();
        $minutes = $matches->sum(fn (LolMatch $match) => $match->duration / 60);
        $duration = max((int) $matches->sum('duration'), 1);
        $deaths = (int) $matches->sum('deaths');
        $wins = $matches->where('win', true)->count();

        $unspent = $matches->map(
            fn (LolMatch $match) => max(0, (int) $match->gold_earned - $this->rawInt($match, 'goldSpent')),
        );

        return [
            'games' => $games,
            'wins' => $wins,
            'winrate' => round($wins / max($games, 1) * 100, 1),
            'minutes' => $minutes,
            'deaths_per_10' => round(10 * $deaths / max($minutes, 1), 2),
            'dead_time_pct' => round(
                100 * $matches->sum(fn (LolMatch $match) => $this->rawInt($match, 'totalTimeSpentDead')) / $duration,
                1,
            ),
            'vision_per_min' => round($matches->sum('vision_score') / max($minutes, 1), 2),
            'cs_per_min' => round($matches->sum('cs') / max($minutes, 1), 2),
            'control_wards_per_game' => round(
                $matches->sum(fn (LolMatch $match) => $this->rawInt($match, 'visionWardsBoughtInGame')) / $games,
                2,
            ),
            'high_death_pct' => round(
                100 * $matches->filter(fn (LolMatch $match) => $match->deaths >= 8)->count() / $games,
                1,
            ),
            'unspent_median' => (int) round($unspent->median() ?? 0),
            'unspent_avg' => (int) round($unspent->avg() ?? 0),
        ];
    }

    private function roles(Collection $matches): Collection
    {
        return $matches
            ->groupBy(fn (LolMatch $match) => $match->role ?: 'UNKNOWN')
            ->map(function (Collection $group, string $role) {
                $stats = $this->metrics($group);
                $targets = $this->targetsFor($role);
                $reliable = $stats['games'] >= self::MIN_ROLE_GAMES;

                return [
                    'key' => $role,
                    'label' => self::ROLE_LABELS[$role] ?? $role,
                    'scope_key' => $role,
                    'games' => $stats['games'],
                    'wins' => $stats['wins'],
                    'winrate' => $stats['winrate'],
                    'deaths_per_10' => $stats['deaths_per_10'],
                    'dead_time_pct' => $stats['dead_time_pct'],
                    'vision_per_min' => $stats['vision_per_min'],
                    'cs_per_min' => $stats['cs_per_min'],
                    'control_wards_per_game' => $stats['control_wards_per_game'],
                    'high_death_pct' => $stats['high_death_pct'],
                    'reliable' => $reliable,
                    'targets' => $targets,
                    'flags' => $reliable
                        ? [
                            'deaths' => $stats['deaths_per_10'] > $targets['deaths_per_10'],
                            'dead_time' => $stats['dead_time_pct'] > $targets['dead_time_pct'],
                            'vision' => $stats['vision_per_min'] < $targets['vision_per_min'],
                            'cs' => $stats['cs_per_min'] < $targets['cs_per_min'],
                            'control_wards' => $stats['control_wards_per_game'] < $targets['control_wards_per_game'],
                        ]
                        : [
                            'deaths' => false,
                            'dead_time' => false,
                            'vision' => false,
                            'cs' => false,
                            'control_wards' => false,
                        ],
                ];
            })
            ->sortByDesc('games')
            ->values();
    }

    private function roleChecks(array $role): array
    {
        return array_values(array_filter([
            $this->deathsCheck($role),
            $this->deadTimeCheck($role),
            $this->visionCheck($role),
            $this->csCheck($role),
            $this->controlWardsCheck($role),
            $this->highDeathsCheck($role),
        ]));
    }

    private function overallChecks(array $overall, Collection $roles): array
    {
        $role = [
            'key' => 'UNKNOWN',
            'label' => 'General',
            'scope_key' => null,
            'games' => $overall['games'],
            'deaths_per_10' => $overall['deaths_per_10'],
            'dead_time_pct' => $overall['dead_time_pct'],
            'vision_per_min' => $overall['vision_per_min'],
            'cs_per_min' => $overall['cs_per_min'],
            'control_wards_per_game' => $overall['control_wards_per_game'],
            'high_death_pct' => $overall['high_death_pct'],
            'targets' => [
                'deaths_per_10' => $this->weightedTarget('deaths_per_10', $roles),
                'dead_time_pct' => $this->weightedTarget('dead_time_pct', $roles),
                'vision_per_min' => $this->weightedTarget('vision_per_min', $roles),
                'cs_per_min' => $this->weightedTarget('cs_per_min', $roles),
                'control_wards_per_game' => $this->weightedTarget('control_wards_per_game', $roles),
                'high_death_pct' => $this->weightedTarget('high_death_pct', $roles),
            ],
        ];

        return $this->roleChecks($role);
    }

    private function generalChecks(Collection $matches, array $overall): array
    {
        return array_values(array_filter([
            $this->unspentCheck($overall),
            $this->tiltCheck($matches, $overall),
        ]));
    }

    private function deathsCheck(array $role): array
    {
        $value = $role['deaths_per_10'];
        $target = $role['targets']['deaths_per_10'];
        $subject = $this->subject($role);

        return $this->makeCheck([
            'metric' => 'deaths_per_10',
            'category' => 'Supervivencia',
            'title' => 'Muertes por 10 minutos',
            'scope' => $this->scope($role),
            'scope_key' => $role['scope_key'],
            'metric_label' => 'Muertes / 10 min',
            'value' => $value,
            'display' => $this->format($value, 2),
            'unit' => 'por 10 min',
            'target' => $target,
            'target_display' => '≤ '.$this->format($target, 2),
            'sample' => $role['games'],
            'higher_is_better' => false,
            'ceiling' => $target * 2,
            'importance' => 20,
            'summary' => "{$subject} mueres {$this->format($value, 2)} veces cada 10 minutos; el objetivo es {$this->format($target, 2)} o menos.",
            'summary_ok' => "{$subject} mueres {$this->format($value, 2)} veces cada 10 minutos y cumples el objetivo (≤ {$this->format($target, 2)}).",
            'advice' => 'Revisa el patrón de tus muertes: evita pelear sin visión, no persigas kills imposibles y vuelve a base cuando no tengas recursos. Cada muerte le regala tempo al rival.',
        ]);
    }

    private function deadTimeCheck(array $role): array
    {
        $value = $role['dead_time_pct'];
        $target = $role['targets']['dead_time_pct'];
        $subject = $this->subject($role);

        return $this->makeCheck([
            'metric' => 'dead_time_pct',
            'category' => 'Supervivencia',
            'title' => 'Tiempo muerto',
            'scope' => $this->scope($role),
            'scope_key' => $role['scope_key'],
            'metric_label' => 'Tiempo muerto',
            'value' => $value,
            'display' => $this->format($value, 1),
            'unit' => '% de la partida',
            'target' => $target,
            'target_display' => '≤ '.$this->format($target, 1).' %',
            'sample' => $role['games'],
            'higher_is_better' => false,
            'ceiling' => $target * 1.9,
            'importance' => 10,
            'summary' => "{$subject} pasas el {$this->format($value, 1)} % de la partida muerto; el objetivo es {$this->format($target, 1)} % o menos.",
            'summary_ok' => "{$subject} pasas el {$this->format($value, 1)} % de la partida muerto y cumples el objetivo (≤ {$this->format($target, 1)} %).",
            'advice' => 'Cuando estás muerto no farmeas, no pones visión y no ayudas. Si ves que la pelea está perdida, retrocede antes: sobrevivir con poca vida también es una ventaja.',
        ]);
    }

    private function visionCheck(array $role): array
    {
        $value = $role['vision_per_min'];
        $target = $role['targets']['vision_per_min'];
        $subject = $this->subject($role);

        return $this->makeCheck([
            'metric' => 'vision_per_min',
            'category' => 'Visión',
            'title' => 'Visión por minuto',
            'scope' => $this->scope($role),
            'scope_key' => $role['scope_key'],
            'metric_label' => 'Visión / min',
            'value' => $value,
            'display' => $this->format($value, 2),
            'unit' => 'por minuto',
            'target' => $target,
            'target_display' => '≥ '.$this->format($target, 1),
            'sample' => $role['games'],
            'higher_is_better' => true,
            'importance' => 15,
            'summary' => "{$subject} generas {$this->format($value, 2)} de visión por minuto; el objetivo es {$this->format($target, 1)} o más.",
            'summary_ok' => "{$subject} generas {$this->format($value, 2)} de visión por minuto y superas el objetivo (≥ {$this->format($target, 1)}).",
            'advice' => 'Compite por visión antes de los objetivos: coloca wards profundas, limpia las del rival y sincroniza con tu jungla para no wardear solo.',
        ]);
    }

    private function csCheck(array $role): array
    {
        $value = $role['cs_per_min'];
        $target = $role['targets']['cs_per_min'];
        $subject = $this->subject($role);

        return $this->makeCheck([
            'metric' => 'cs_per_min',
            'category' => 'Farmeo',
            'title' => 'Farmeo por minuto',
            'scope' => $this->scope($role),
            'scope_key' => $role['scope_key'],
            'metric_label' => 'CS / min',
            'value' => $value,
            'display' => $this->format($value, 1),
            'unit' => 'por minuto',
            'target' => $target,
            'target_display' => '≥ '.$this->format($target, 1),
            'sample' => $role['games'],
            'higher_is_better' => true,
            'importance' => 15,
            'summary' => "{$subject} consigues {$this->format($value, 1)} CS por minuto; el objetivo es {$this->format($target, 1)} o más.",
            'summary_ok' => "{$subject} consigues {$this->format($value, 1)} CS por minuto y cumples el objetivo (≥ {$this->format($target, 1)}).",
            'advice' => $role['key'] === 'UTILITY'
                ? 'No necesitas farmear como un carry, pero aprovecha las oleadas que quedan sin dueño y no pierdas tiempo en carriles vacíos cuando hay objetivos disponibles.'
                : 'Reserva oleadas antes de moverte y practica last hits con tu campeón. Un CS más por minuto son unos 20 súbditos cada 20 minutos: oro gratis para tu próximo objeto.',
        ]);
    }

    private function controlWardsCheck(array $role): array
    {
        $value = $role['control_wards_per_game'];
        $target = $role['targets']['control_wards_per_game'];
        $subject = $this->subject($role);

        return $this->makeCheck([
            'metric' => 'control_wards_per_game',
            'category' => 'Visión',
            'title' => 'Wards de control',
            'scope' => $this->scope($role),
            'scope_key' => $role['scope_key'],
            'metric_label' => 'Wards de control',
            'value' => $value,
            'display' => $this->format($value, 1),
            'unit' => 'por partida',
            'target' => $target,
            'target_display' => '≥ '.$this->format($target, 0),
            'sample' => $role['games'],
            'higher_is_better' => true,
            'importance' => 15,
            'summary' => "{$subject} compras {$this->format($value, 1)} wards de control por partida; el objetivo es {$this->format($target, 0)} o más.",
            'summary_ok' => "{$subject} compras {$this->format($value, 1)} wards de control por partida y superas el objetivo (≥ {$this->format($target, 0)}).",
            'advice' => 'Compra al menos un ward de control cada vez que vuelvas a base. No es solo visión: también niega la del rival y te da un punto seguro para pelear por dragón o barón.',
        ]);
    }

    private function highDeathsCheck(array $role): array
    {
        $value = $role['high_death_pct'];
        $target = $role['targets']['high_death_pct'];
        $subject = $this->subject($role);

        return $this->makeCheck([
            'metric' => 'high_death_pct',
            'category' => 'Supervivencia',
            'title' => 'Partidas con 8+ muertes',
            'scope' => $this->scope($role),
            'scope_key' => $role['scope_key'],
            'metric_label' => 'Partidas 8+ muertes',
            'value' => $value,
            'display' => $this->format($value, 1),
            'unit' => '% de partidas',
            'target' => $target,
            'target_display' => '≤ '.$this->format($target, 0).' %',
            'sample' => $role['games'],
            'higher_is_better' => false,
            'ceiling' => $target * 4,
            'importance' => 5,
            'summary' => "{$subject} el {$this->format($value, 1)} % de tus partidas termina con 8 muertes o más; el objetivo es no pasar del {$this->format($target, 0)} %.",
            'summary_ok' => "{$subject} solo el {$this->format($value, 1)} % de tus partidas termina con 8 muertes o más y cumples el objetivo (≤ {$this->format($target, 0)} %).",
            'advice' => 'Cuando llegues a 5 o 6 muertes, cambia el plan: juega más atrás, prioriza farmear seguro y deja que el equipo inicie. No necesitas heroísmos para cerrar una partida.',
        ]);
    }

    private function unspentCheck(array $overall): array
    {
        $value = $overall['unspent_median'];
        $target = 500;

        return $this->makeCheck([
            'metric' => 'unspent_gold',
            'category' => 'Recursos',
            'title' => 'Oro sin gastar',
            'scope' => null,
            'scope_key' => null,
            'metric_label' => 'Oro sin gastar',
            'value' => $value,
            'display' => $this->format($value, 0),
            'unit' => 'de oro (mediana)',
            'target' => $target,
            'target_display' => '≤ '.$this->format($target, 0),
            'sample' => $overall['games'],
            'higher_is_better' => false,
            'ceiling' => 1500,
            'importance' => 10,
            'summary' => "Terminas tus partidas con una mediana de {$this->format($value, 0)} de oro sin gastar; el objetivo es {$this->format($target, 0)} o menos.",
            'summary_ok' => "Terminas tus partidas con una mediana de {$this->format($value, 0)} de oro sin gastar y cumples el objetivo (≤ {$this->format($target, 0)}).",
            'advice' => 'Antes de una pelea por objetivo, si llevas más de 1.000 de oro, busca una base rápida. Un componente extra puede decidir la siguiente pelea; el oro en el bolsillo no hace daño.',
        ]);
    }

    private function tiltCheck(Collection $matches, array $overall): ?array
    {
        $timezone = config('diary.timezone');
        $afterLossGames = 0;
        $afterLossWins = 0;

        $days = $matches->groupBy(
            fn (LolMatch $match) => $match->played_at->copy()->setTimezone($timezone)->toDateString(),
        );

        foreach ($days as $dayMatches) {
            $previous = null;

            foreach ($dayMatches->sortBy('played_at') as $match) {
                if ($previous !== null && $previous->win === false) {
                    $afterLossGames++;

                    if ($match->win) {
                        $afterLossWins++;
                    }
                }

                $previous = $match;
            }
        }

        // One or two games are anecdotes, not a pattern.
        if ($afterLossGames < 4) {
            return null;
        }

        $value = round($afterLossWins / $afterLossGames * 100, 1);
        $target = max(45.0, round($overall['winrate'] - 5, 1));

        return $this->makeCheck([
            'metric' => 'tilt_winrate',
            'category' => 'Mentalidad',
            'title' => 'Respuesta tras una derrota',
            'scope' => 'Mismo día',
            'scope_key' => 'SAME_DAY',
            'metric_label' => 'Winrate tras derrota',
            'value' => $value,
            'display' => $this->format($value, 1),
            'unit' => '% de winrate',
            'target' => $target,
            'target_display' => '≥ '.$this->format($target, 1).' %',
            'sample' => $afterLossGames,
            'higher_is_better' => true,
            'importance' => 10,
            'summary' => "Ganas el {$this->format($value, 1)} % de las partidas que juegas después de una derrota el mismo día ({$afterLossGames} partidas).",
            'summary_ok' => "Ganas el {$this->format($value, 1)} % de las partidas que juegas después de una derrota el mismo día y superas el objetivo (≥ {$this->format($target, 1)} %).",
            'advice' => 'Si pierdes dos seguidas, para diez minutos: agua, estirarte y revisar qué falló. Volver a la cola con la cabeza caliente suele costar más LP que esperar.',
        ]);
    }

    private function makeCheck(array $data): array
    {
        $severity = $this->severity(
            (float) $data['value'],
            (float) $data['target'],
            (bool) $data['higher_is_better'],
            isset($data['ceiling']) ? (float) $data['ceiling'] : null,
        );

        $level = match (true) {
            $severity >= 50 => 'alta',
            $severity >= 25 => 'media',
            $severity > 0 => 'baja',
            default => 'ok',
        };

        $status = match (true) {
            $severity >= 50 => 'Prioridad alta',
            $severity >= 25 => 'Prioridad media',
            $severity >= 10 => 'A vigilar',
            $severity > 0 => 'Cerca del objetivo',
            default => 'Objetivo cumplido',
        };

        return [
            'key' => $data['metric'].'_'.($data['scope_key'] ?? 'general'),
            'metric' => $data['metric'],
            'category' => $data['category'],
            'title' => $data['title'],
            'scope' => $data['scope'],
            'scope_key' => $data['scope_key'],
            'metric_label' => $data['metric_label'],
            'value' => $data['value'],
            'display' => $data['display'],
            'unit' => $data['unit'],
            'target' => $data['target'],
            'target_display' => $data['target_display'],
            'sample' => $data['sample'],
            'severity' => $severity,
            'level' => $level,
            'status' => $status,
            'higher_is_better' => $data['higher_is_better'],
            'importance' => $data['importance'],
            'summary' => $severity === 0 ? $data['summary_ok'] : $data['summary'],
            'advice' => $severity === 0 ? null : $data['advice'],
            'headroom' => round(
                $data['higher_is_better']
                    ? (float) $data['value'] / max((float) $data['target'], 0.01)
                    : (float) $data['target'] / max((float) $data['value'], 0.01),
                3,
            ),
        ];
    }

    /**
     * One headline per metric. For role-based metrics the worst role wins,
     * so the page gives advice about a real role instead of a mixed average.
     */
    private function headlines(array $candidates): array
    {
        $headlines = [];

        foreach ($candidates as $check) {
            $current = $headlines[$check['metric']] ?? null;

            if (
                $current === null
                || $check['severity'] > $current['severity']
                || ($check['severity'] === $current['severity'] && $check['sample'] > $current['sample'])
            ) {
                $headlines[$check['metric']] = $check;
            }
        }

        $headlines = array_values($headlines);

        usort($headlines, fn (array $a, array $b) => $b['severity'] <=> $a['severity']
            ?: $b['importance'] <=> $a['importance']
            ?: strcmp($a['title'], $b['title']));

        return $headlines;
    }

    /**
     * Best example of each metric that already meets its target.
     */
    private function strengths(array $candidates): array
    {
        $strengths = [];

        foreach ($candidates as $check) {
            if ($check['severity'] !== 0) {
                continue;
            }

            $current = $strengths[$check['metric']] ?? null;

            if ($current === null || $check['headroom'] > $current['headroom']) {
                $strengths[$check['metric']] = $check;
            }
        }

        $strengths = array_values($strengths);

        usort($strengths, fn (array $a, array $b) => $b['headroom'] <=> $a['headroom']);

        return array_slice($strengths, 0, 3);
    }

    private function score(array $headlines): int
    {
        $weight = array_sum(array_column($headlines, 'importance'));

        if ($weight === 0) {
            return 100;
        }

        $penalty = array_sum(array_map(
            fn (array $check) => $check['severity'] * $check['importance'],
            $headlines,
        )) / $weight;

        return (int) max(0, min(100, round(100 - $penalty)));
    }

    private function diagnosis(array $weaknesses, int $score, int $games): string
    {
        if ($weaknesses === []) {
            return "Con {$games} partidas analizadas no aparecen falencias claras. Mantén lo que ya funciona y sigue sumando muestra.";
        }

        $first = $weaknesses[0];
        $second = $weaknesses[1] ?? null;

        $text = "Con {$games} partidas analizadas, tu prioridad es «{$first['title']}»";
        $text .= $first['scope'] ? " como {$first['scope']}." : '.';

        if ($second !== null) {
            $text .= " Después, hay margen en «{$second['title']}»";
            $text .= $second['scope'] ? " como {$second['scope']}." : '.';
        } elseif ($score >= 85) {
            $text .= ' Tus métricas están cerca de los objetivos.';
        }

        return $text;
    }

    private function severity(float $value, float $target, bool $higherIsBetter, ?float $ceiling = null): int
    {
        if ($higherIsBetter) {
            if ($value >= $target) {
                return 0;
            }

            return (int) min(100, max(0, round(($target - $value) / max($target, 0.01) * 100)));
        }

        if ($value <= $target) {
            return 0;
        }

        $ceiling ??= $target * 2;

        if ($ceiling <= $target) {
            return 100;
        }

        return (int) min(100, max(0, round(($value - $target) / ($ceiling - $target) * 100)));
    }

    private function targetsFor(string $role): array
    {
        $targets = [];

        foreach (self::TARGETS as $metric => $values) {
            $targets[$metric] = $values[$role] ?? $values['UNKNOWN'];
        }

        return $targets;
    }

    private function weightedTarget(string $metric, Collection $roles): float
    {
        $games = $roles->sum('games');

        if ($games === 0) {
            return self::TARGETS[$metric]['UNKNOWN'];
        }

        $weighted = $roles->sum(
            fn (array $role) => (self::TARGETS[$metric][$role['key']] ?? self::TARGETS[$metric]['UNKNOWN']) * $role['games'],
        );

        return round($weighted / $games, 2);
    }

    private function subject(array $role): string
    {
        return $role['scope_key'] === null ? 'En general' : 'Como '.$role['label'];
    }

    private function scope(array $role): ?string
    {
        return $role['scope_key'] === null ? null : $role['label'];
    }

    private function rawInt(LolMatch $match, string $key): int
    {
        return (int) ($match->raw[$key] ?? 0);
    }

    private function format(float|int $value, int $decimals = 1): string
    {
        $formatted = number_format((float) $value, $decimals, ',', '.');

        if ($decimals > 0) {
            $formatted = rtrim(rtrim($formatted, '0'), ',');
        }

        return $formatted;
    }

    private function benchmarks(): array
    {
        return [
            [
                'label' => 'Muertes cada 10 minutos',
                'target' => '1,2 o menos en línea y jungla; 1,3 o menos en support.',
            ],
            [
                'label' => 'Tiempo muerto',
                'target' => '7 % de la partida o menos (7,5 % en support).',
            ],
            [
                'label' => 'Visión por minuto',
                'target' => '0,8 en Top/Mid/Bot, 1,0 en jungla y 2,0 en support.',
            ],
            [
                'label' => 'Farmeo por minuto',
                'target' => '6,5 en Top, 7,0 en Mid/Bot, 5,5 en jungla y 1,5 en support.',
            ],
            [
                'label' => 'Wards de control',
                'target' => '4 por partida en carriles, 5 en jungla y 8 en support.',
            ],
            [
                'label' => 'Partidas con 8+ muertes',
                'target' => 'no más del 10 % de las partidas.',
            ],
            [
                'label' => 'Oro sin gastar',
                'target' => 'mediana de 500 o menos al terminar la partida.',
            ],
            [
                'label' => 'Winrate tras una derrota',
                'target' => '45 % o más, y no más de 5 puntos por debajo de tu winrate general.',
            ],
        ];
    }

    private function baseQuery(User $user, ?int $accountId): Builder
    {
        $query = LolMatch::query()
            ->whereIn('riot_account_id', $user->riotAccounts()->select('id'));

        if ($accountId !== null) {
            $query->where('riot_account_id', $accountId);
        }

        return $query;
    }
}
