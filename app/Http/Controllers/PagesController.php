<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Recipe;

class PagesController extends Controller
{
    public function discover_recipes(){
        $recipes = Recipe::all();
        return view('pages.discover_recipes')->with('recipes', $recipes);
    }
}
