<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Storeroom extends Model
{
    public function user(){
        return $this->belongsTo('App\User');
    }

    public function ingredient_storerooms(){
        return $this->hasMany('App\IngredientStoreroom');
    }
}
