<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FavoriteUserRecipe extends Model
{
    public function user() {
       return $this->belongsTo('App\User');
    }

    public function recipe() {
       return $this->belongsTo('App\Recipe');
    }
}
