<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Recipe;
use Illuminate\Support\Facades\Auth;
use App\User;

class RecipesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($user_id)
    {

        $user = User::find($user_id);
        $recipes = $user->recipes;
        return view('users.recipes.index')->with('recipes', $recipes);
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
        $recipe->delete();

        return redirect(route("users.recipes.index", $user_id));
    }
}
