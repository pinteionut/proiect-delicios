<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecipesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->string('name');
            $table->mediumText('body');

            $table->string('type');

            // 0 -> private, 1 -> needs approval, 2 -> published
            $table->integer('status');

            // 0 -> easy, 1 -> medium, 3 -> hard
            $table->integer('dificulty');

            $table->integer('portions');
            $table->integer('preparation_time');

            $table->integer('user_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('recipes');
    }
}
