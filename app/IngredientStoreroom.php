<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IngredientStoreroom extends Model
{
    public function storeroom(){
        return $this->blongsTo('App\Storeroom');
    }

    public function ingredient(){
        return $this->belongsTo('App\Ingredient');
    }
}
