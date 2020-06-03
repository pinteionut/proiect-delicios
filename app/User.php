<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Storeroom;

class User extends Authenticatable
{
    use Notifiable;
    
    protected static function booted()
    {
        self::created(function($user){
            $storeroom = new Storeroom;
            $storeroom -> user_id = $user -> id;
            $storeroom -> save();
        });
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function recipes(){
        return $this->hasMany('App\Recipe');
    }
    
    public function favorite_user_recipes(){
        return $this->hasMany('App\FavoriteUserRecipe');
    }
    
    public function comments(){
        return $this->hasMany('App\Comment');
    }

    public function menus(){
        return $this->hasMany('App\Menu');
    }

    public function storeroom(){
        return $this->hasOne('App\Storeroom');
    }

    public function prepare($recipe, $needed){
        $totalIngredients = count($recipe->ingredients);
        $counterIngredients = 0;
        foreach($recipe->ingredients as $ingredient) {
            $user_ingredient = $this->storeroom->ingredients->where('id', $ingredient->id)->first();
            if($user_ingredient && $user_ingredient->pivot->quantity >= $ingredient->pivot->quantity) {
                $counterIngredients++;
            }
        }
        if ($needed == 'all' && $totalIngredients != $counterIngredients) {
            return false;
        }
        if ($needed == 'none' && $counterIngredients > 0) {
            return false;
        }
        if ($needed == 'some' && $counterIngredients === 0) {
            return false;
        }
        return true;
    }
}
