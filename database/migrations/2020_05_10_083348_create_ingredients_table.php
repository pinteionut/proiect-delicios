<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIngredientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ingredients', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->string('name');

            $table->integer('calories');
            $table->integer('default_quantity');

            $table->string('measure_type');

            // 0 -> private, 1 -> needs approval, 2 -> published
            $table->integer('status');

            $table->string('type');

            // Omnivore, vegetarian, vegan etc.
            $table->string('diet');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ingredients');
    }
}
