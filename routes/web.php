<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LolDiaryController;
use App\Http\Controllers\DiaryEntryController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\RiotAccountController;

Route::get('/', fn() => redirect()->route(auth()->check() ? 'diary.calendar' : 'login'))->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::redirect('dashboard', '/diary/calendar')->name('dashboard');

    Route::get('diary', [LolDiaryController::class, 'index'])->name('diary.index');
    Route::post('riot-accounts/{riotAccount}/fetch', [LolDiaryController::class, 'fetch'])->name('riot-accounts.fetch');
    Route::get('diary/calendar', [LolDiaryController::class, 'calendar'])->name('diary.calendar');
    Route::put('matches/{lolMatch}/diary-entry', [DiaryEntryController::class, 'update'])->name('diary-entry.update');
    Route::get('diary/stats', [StatsController::class, 'index'])->name('diary.stats');
    Route::get('diary/accounts', [RiotAccountController::class, 'index'])->name('diary.accounts');
    Route::post('riot-accounts', [RiotAccountController::class, 'store'])->middleware('throttle:10,1')->name('riot-accounts.store');
    Route::put('riot-accounts/{riotAccount}', [RiotAccountController::class, 'update'])->name('riot-accounts.update');
    Route::post('riot-accounts/{riotAccount}/sync', [RiotAccountController::class, 'sync'])->middleware('throttle:10,1')->name('riot-accounts.sync');
    Route::delete('riot-accounts/{riotAccount}', [RiotAccountController::class, 'destroy'])->name('riot-accounts.destroy');
});

require __DIR__ . '/settings.php';
