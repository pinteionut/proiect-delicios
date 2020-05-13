<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MenuRecipe extends Model
{
    public function menu() {
       return $this->belongsTo('App\Menu');
    }

    public function recipe() {
       return $this->belongsTo('App\Recipe');
    }
}
