<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Recipe;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\IngredientRecipe;

class RecipesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $user_id)
    {
        if($request->wantsJson()) {
            $recipes = Recipe::all();
            if($request->input('filters_on') == 'true') {

                if($request->input('type')) {
                    $recipes = Recipe::whereIn('type', $request->input('type'));
                    $recipes = $recipes->get();
                }
                if($request->input('needed_ingredients')) {
                    $needed = $request->input('needed_ingredients');
                    $recipes = $recipes->filter(function ($recipe) use ($needed) {
                        return Auth::user()->prepare($recipe, $needed);
                    })->values();
                }
                // else {
                //     $recipes = $recipes->get();
                // }
            }
            return response()->json(json_encode($recipes));
        }
        else {
            $user = User::find($user_id);
            $recipes = $user->recipes;
            return view('users.recipes.index')->with('recipes', $recipes);
        }
    }

    public function types()
    {
        $recipe_types = Recipe::groupBy('type')->pluck('type');
        return response()->json(json_encode($recipe_types));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($user_id)
    {
        return view('users.recipes.create')->with('user_id', $user_id);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $user_id)
    {
        $recipe = new Recipe;
        $recipe->name = $request->name; 
        $recipe->body = $request->body;
        $recipe->type = $request->type;
        $recipe->status = 0;
        $recipe->dificulty = $request->dificulty;
        $recipe->portions = $request->portions;
        $recipe->preparation_time = $request->preparation_time;
        $recipe->user_id = $user_id;
        $recipe->save();

        return redirect(route("users.recipes.index", $user_id));
    }

    public function addRecipe(Request $request)
    {
        $data = json_decode($request->getContent());
        $recipe = new Recipe;
        $recipe->name = $data->name;
        $recipe->body = $data->body;
        $recipe->type = $data->type;
        $recipe->status = 0;
        $recipe->dificulty = $data->dificulty;
        $recipe->portions = $data->portions;
        $recipe->preparation_time = $data->preparation_time;
        $recipe->user_id = Auth::user()->id;
        $recipe->save();

        foreach($data->ingredients as $ingredient) {
            $ingredient_recipe = new IngredientRecipe;
            $ingredient_recipe->ingredient_id = $ingredient->id;
            $ingredient_recipe->recipe_id = $recipe->id;
            $ingredient_recipe->quantity = $ingredient->quantity;
            $ingredient_recipe->save();
        }

        return ['redirect' => route("users.recipes.index", Auth::user()->id)];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($user_id, $id)
    {
        $recipe = Recipe::find($id);
        $data = [
            'user_id' => $user_id,
            'recipe' => $recipe
        ];
        return view('users.recipes.edit')->with($data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $user_id, $id)
    {
        $recipe = Recipe::find($id);
        $recipe->name = $request->name; 
        $recipe->body = $request->body;
        $recipe->type = $request->type;
        $recipe->status = 0;
        $recipe->dificulty = $request->dificulty;
        $recipe->portions = $request->portions;
        $recipe->preparation_time = $request->preparation_time;
        $recipe->save();

        return redirect(route("users.recipes.index", $user_id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($user_id, $id)
    {
        $recipe = Recipe::find($id);
        foreach($recipe->ingredient_recipes as $ingredient_recipe) {
            $ingredient_recipe->delete();
        }
        $recipe->delete();

        return redirect(route("users.recipes.index", $user_id));
    }
}
