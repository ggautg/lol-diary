<?php

namespace App\Http\Controllers;

use App\Services\StatsService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class StatsController extends Controller
{
    public function index(Request $request, StatsService $stats): Response
    {
        $data = $request->validate([
            'account' => [
                'nullable',
                'integer',
                Rule::exists('riot_accounts', 'id')->where('user_id', $request->user()->id),
            ],
        ]);

        $accountId = isset($data['account']) ? (int) $data['account'] : null;

        return Inertia::render('Diary/Stats', [
            'accounts' => $request->user()->riotAccounts()->orderBy('label')->get(['id', 'label']),
            'selectedAccount' => $accountId,
            'stats' => $stats->dashboard($request->user(), $accountId),
        ]);
    }
}