<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LolDiaryController;
use App\Http\Controllers\DiaryEntryController;

Route::inertia('/', 'Welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'Dashboard')->name('dashboard');

    Route::get('diary', [LolDiaryController::class, 'index'])->name('diary.index');
    Route::post('riot-accounts/{riotAccount}/fetch', [LolDiaryController::class, 'fetch'])->name('riot-accounts.fetch');
    Route::get('diary/calendar', [LolDiaryController::class, 'calendar'])->name('diary.calendar');

    Route::put('matches/{lolMatch}/diary-entry', [DiaryEntryController::class, 'update'])->name('diary-entry.update');
});

require __DIR__ . '/settings.php';
