<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('riot_accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('label');                      // your own name for it: "main", "smurf"
            $table->string('game_name');
            $table->string('tag_line');
            $table->string('platform')->default('la2');   // la2 = LAS, la1 = LAN, na1, br1...
            $table->string('puuid')->nullable()->unique(); // filled after the first lookup
            $table->timestamps();

            $table->unique(['user_id', 'game_name', 'tag_line', 'platform']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riot_accounts');
    }
};
