<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    public function ingredient_recipes(){
        return $this->hasMany('App\IngredientRecipe');
    }
    
    public function ingredient_storerooms(){
        return $this->hasMany('App\IngredientStoreroom');
    }
}
