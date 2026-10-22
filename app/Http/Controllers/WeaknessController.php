<?php

namespace App\Http\Controllers;

use App\Services\WeaknessService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class WeaknessController extends Controller
{
    public function index(Request $request, WeaknessService $weaknesses): Response
    {
        $data = $request->validate([
            'account' => [
                'nullable',
                'integer',
                Rule::exists('riot_accounts', 'id')->where('user_id', $request->user()->id),
            ],
        ]);

        $accountId = isset($data['account']) ? (int) $data['account'] : null;

        return Inertia::render('Diary/Weaknesses', [
            'accounts' => $request->user()->riotAccounts()->orderBy('label')->get(['id', 'label']),
            'selectedAccount' => $accountId,
            'analysis' => $weaknesses->analyze($request->user(), $accountId),
        ]);
    }
}
