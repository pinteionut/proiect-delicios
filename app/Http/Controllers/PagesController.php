<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Recipe;

class PagesController extends Controller
{
    public function discover_recipes(){
        return view('pages.discover_recipes');
    }

    public function show_recipe(Request $request, $id){
        if($request->wantsJson()) {
            $recipe = Recipe::find($id);
            $ingredients = $recipe->ingredients;
            $chef = $recipe->user->name;
            return response()->json(json_encode([$recipe, $ingredients, $chef]));
        } else {
            return view('pages.show_recipe');
        }
    }
}
