<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    public function user() {
       return $this->belongsTo('App\User');
    }

    public function favorite_user_recipes(){
        return $this->hasMany('App\FavoriteUserRecipe');
    }
}
