<?php

namespace App\Http\Controllers;

use App\Models\RiotAccount;
use App\Services\RiotApiService;
use App\Support\RiotErrorMessage;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RiotAccountController extends Controller
{
    private const MAX_ACCOUNTS = 10;

    public function index(Request $request): Response
    {
        $accounts = $request->user()->riotAccounts()
            ->withCount([
                'matches',
                'matches as notes_count' => fn ($query) => $query->whereHas('diaryEntry'),
            ])
            ->orderBy('label')
            ->get()
            ->map(fn (RiotAccount $account) => [
                'id' => $account->id,
                'label' => $account->label,
                'game_name' => $account->game_name,
                'tag_line' => $account->tag_line,
                'platform' => $account->platform,
                'verified' => $account->puuid !== null,
                'matches_count' => $account->matches_count,
                'notes_count' => $account->notes_count,
            ]);

        return Inertia::render('Diary/Accounts', [
            'accounts' => $accounts,
            'platforms' => $this->platforms(),
            'maxAccounts' => self::MAX_ACCOUNTS,
        ]);
    }

    public function store(Request $request, RiotApiService $riot): RedirectResponse
    {
        $user = $request->user();

        $data = $request->validate([
            'riot_id' => ['required', 'string', 'max:40'],
            'label' => [
                'required', 'string', 'max:30',
                Rule::unique('riot_accounts', 'label')->where('user_id', $user->id),
            ],
            'platform' => ['required', Rule::in(array_keys(config('riot.regions')))],
        ]);

        if ($user->riotAccounts()->count() >= self::MAX_ACCOUNTS) {
            throw ValidationException::withMessages([
                'riot_id' => 'Llegaste al máximo de ' . self::MAX_ACCOUNTS . ' cuentas.',
            ]);
        }

        [$gameName, $tagLine] = $this->splitRiotId($data['riot_id']);

        try {
            $riotData = $riot->getAccountByRiotId($gameName, $tagLine, $data['platform']);
        } catch (RequestException|ConnectionException $e) {
            throw ValidationException::withMessages(['riot_id' => RiotErrorMessage::describe($e)]);
        }

        if ($user->riotAccounts()->where('puuid', $riotData['puuid'])->exists()) {
            throw ValidationException::withMessages(['riot_id' => 'Ya tienes registrada esa cuenta.']);
        }

        try {
            $user->riotAccounts()->create([
                'label' => $data['label'],
                'platform' => $data['platform'],
                'puuid' => $riotData['puuid'],
                'game_name' => $riotData['gameName'],
                'tag_line' => $riotData['tagLine'],
            ]);
        } catch (UniqueConstraintViolationException) {
            throw ValidationException::withMessages(['riot_id' => 'Esa cuenta de Riot ya está registrada.']);
        }

        return back()->with('success', "Cuenta {$data['label']} añadida. Pulsa Fetch en Partidas para importar sus partidas.");
    }

    public function update(Request $request, RiotAccount $riotAccount): RedirectResponse
    {
        $this->authorizeOwner($request, $riotAccount);

        $data = $request->validate([
            'label' => [
                'required', 'string', 'max:30',
                Rule::unique('riot_accounts', 'label')
                    ->where('user_id', $request->user()->id)
                    ->ignore($riotAccount->id),
            ],
            'platform' => ['required', Rule::in(array_keys(config('riot.regions')))],
        ]);

        $riotAccount->update($data);

        return back()->with('success', 'Cuenta actualizada.');
    }

    /**
     * Ask Riot for the current Riot ID of this account (names can change in-game).
     */
    public function sync(Request $request, RiotAccount $riotAccount, RiotApiService $riot): RedirectResponse
    {
        $this->authorizeOwner($request, $riotAccount);

        try {
            $data = $riotAccount->puuid !== null
                ? $riot->getAccountByPuuid($riotAccount->puuid, $riotAccount->platform)
                : $riot->getAccountByRiotId($riotAccount->game_name, $riotAccount->tag_line, $riotAccount->platform);
        } catch (RequestException|ConnectionException $e) {
            return back()->withErrors(['account' => RiotErrorMessage::describe($e)]);
        }

        $before = "{$riotAccount->game_name}#{$riotAccount->tag_line}";
        $after = "{$data['gameName']}#{$data['tagLine']}";

        try {
            $riotAccount->update([
                'puuid' => $data['puuid'],
                'game_name' => $data['gameName'],
                'tag_line' => $data['tagLine'],
            ]);
        } catch (UniqueConstraintViolationException) {
            return back()->withErrors(['account' => 'Esa cuenta de Riot ya está registrada en otra de tus cuentas.']);
        }

        return back()->with('success', $before === $after
            ? "{$riotAccount->label}: ya estaba al día ({$after})."
            : "{$riotAccount->label}: {$before} → {$after}.");
    }

    public function destroy(Request $request, RiotAccount $riotAccount): RedirectResponse
    {
        $this->authorizeOwner($request, $riotAccount);

        $label = $riotAccount->label;
        $riotAccount->delete(); // matches and their diary entries go with it (cascade)

        return back()->with('success', "Cuenta {$label} eliminada.");
    }

    private function authorizeOwner(Request $request, RiotAccount $riotAccount): void
    {
        abort_unless($riotAccount->user_id === $request->user()->id, 403);
    }

    /**
     * "Name#TAG" => ["Name", "TAG"]. Splits on the LAST "#".
     */
    private function splitRiotId(string $riotId): array
    {
        $position = strrpos($riotId, '#');

        $gameName = $position === false ? '' : trim(substr($riotId, 0, $position));
        $tagLine = $position === false ? '' : trim(substr($riotId, $position + 1));

        if ($gameName === '' || $tagLine === '') {
            throw ValidationException::withMessages([
                'riot_id' => 'Escribe el Riot ID completo, con el formato Nombre#TAG.',
            ]);
        }

        return [$gameName, $tagLine];
    }

    private function platforms(): array
    {
        return collect(config('riot.regions'))
            ->keys()
            ->map(fn (string $key) => [
                'value' => $key,
                'label' => config("riot.platform_labels.{$key}", strtoupper($key)),
            ])
            ->values()
            ->all();
    }
}