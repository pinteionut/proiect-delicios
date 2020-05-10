<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    public function user(){
        return $this->belongsTo('App\User');
    }

    public function menu_recipes(){
        return $this->hasMany('App\MenuRecipe');
    }
}
