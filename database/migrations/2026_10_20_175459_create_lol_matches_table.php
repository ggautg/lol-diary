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
        Schema::create('lol_matches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('riot_account_id')->constrained()->cascadeOnDelete();
            $table->string('riot_match_id');              // e.g. "LA2_1234567890"
            $table->unsignedInteger('queue_id')->nullable();
            $table->string('champion');
            $table->string('role')->nullable();           // TOP, JUNGLE, MIDDLE, BOTTOM, UTILITY
            $table->boolean('win');
            $table->unsignedSmallInteger('kills');
            $table->unsignedSmallInteger('deaths');
            $table->unsignedSmallInteger('assists');
            $table->unsignedInteger('damage_dealt');      // total damage to champions
            $table->unsignedInteger('damage_taken');
            $table->unsignedInteger('gold_earned');
            $table->unsignedSmallInteger('cs');           // minions + jungle monsters
            $table->unsignedSmallInteger('vision_score')->default(0);
            $table->unsignedSmallInteger('duration');     // seconds
            $table->timestamp('played_at')->index();
            $table->json('raw')->nullable();              // full Riot payload
            $table->timestamps();

            $table->unique(['riot_account_id', 'riot_match_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lol_matches');
    }
};
