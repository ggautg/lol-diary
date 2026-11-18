<?php

namespace App\Http\Controllers;

use App\Models\LolMatch;
use App\Models\RiotAccount;
use App\Services\MatchImporter;
use App\Support\RiotErrorMessage;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Pantallas principales del diario: últimas partidas, calendario e importación.
 */
class LolDiaryController extends Controller
{
    /**
     * Listado de cuentas y últimas partidas importadas.
     */
    public function index(Request $request): Response
    {
        $accounts = $request->user()->riotAccounts()
            ->withCount('matches')
            ->orderBy('label')
            ->get(['id', 'label', 'game_name', 'tag_line', 'platform']);

        $matches = LolMatch::with('riotAccount:id,label', 'diaryEntry')
            ->whereIn('riot_account_id', $accounts->pluck('id'))
            ->orderByDesc('played_at')
            ->limit(30)
            ->get()
            ->map(fn (LolMatch $match) => $match->toDiaryArray());

        return Inertia::render('Diary/Index', [
            'accounts' => $accounts,
            'matches' => $matches,
        ]);
    }

    /**
     * Importa las últimas partidas de una cuenta desde Riot.
     *
     * Devuelve cuántas partidas nuevas se guardaron, sin duplicar las que
     * ya existían.
     */
    public function fetch(Request $request, RiotAccount $riotAccount, MatchImporter $importer): RedirectResponse
    {
        abort_unless($riotAccount->user_id === $request->user()->id, 403);

        try {
            $imported = $importer->import($riotAccount, 20);
        } catch (RequestException|ConnectionException $e) {
            return back()->withErrors(['fetch' => RiotErrorMessage::describe($e)]);
        }

        return back()->with('success', $imported === 0
            ? "{$riotAccount->label}: no hay partidas nuevas."
            : "{$riotAccount->label}: {$imported} partidas nuevas importadas.");
    }

    /**
     * Calendario mensual de partidas con las notas de cada día.
     *
     * El mes se recibe como "Y-m"; las fechas se agrupan en la zona horaria
     * del diario (config/diary.php) y no en UTC.
     */
    public function calendar(Request $request): Response
    {
        $request->validate(['month' => ['nullable', 'date_format:Y-m']]);

        $tz = config('diary.timezone');

        // Se construye desde "Y-m-01" para que el día nunca desborde (ej. 31 feb).
        $monthKey = $request->query('month') ?? now($tz)->format('Y-m');
        $month = Carbon::createFromFormat('Y-m-d', "{$monthKey}-01", $tz)->startOfDay();

        $accounts = $request->user()->riotAccounts()
            ->orderBy('label')
            ->get(['id', 'label']);

        $matches = LolMatch::with('riotAccount:id,label', 'diaryEntry')
            ->whereIn('riot_account_id', $accounts->pluck('id'))
            ->whereBetween('played_at', [
                $month->copy()->startOfMonth()->utc(),
                $month->copy()->endOfMonth()->utc(),
            ])
            ->orderBy('played_at')
            ->get()
            ->map(function (LolMatch $match) use ($tz) {
                $local = $match->played_at->copy()->setTimezone($tz);

                return [
                    ...$match->toDiaryArray(),
                    'date' => $local->toDateString(),
                    'time' => $local->format('H:i'),
                ];
            });

        return Inertia::render('Diary/Calendar', [
            'month' => $month->format('Y-m'),
            'prevMonth' => $month->copy()->subMonth()->format('Y-m'),
            'nextMonth' => $month->copy()->addMonth()->format('Y-m'),
            'accounts' => $accounts,
            'matches' => $matches,
            'allTags' => $request->user()->tags()
                ->withCount('diaryEntries')
                ->orderByDesc('diary_entries_count')
                ->orderBy('name')
                ->pluck('name'),
        ]);
    }
}
