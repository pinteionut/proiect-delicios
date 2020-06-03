<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Ingredient;
class IngredientsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request->wantsJson()) {
            $ingredients = Ingredient::all();
            return response()->json(json_encode($ingredients));
        }
        else {
            return view('ingredients.index');
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('ingredients.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = json_decode($request->getContent());
        $ingredient = new Ingredient;
        $ingredient->name = $data->name;
        $ingredient->calories = $data->calories;
        $ingredient->default_quantity = $data->default_quantity;
        $ingredient->measure_type = $data->measure_type;
        $ingredient->status = 0;
        $ingredient->type = $data->type;
        $ingredient->diet = $data->diet;
        $ingredient->save();
        return ['redirect' => route("ingredients.index")];
    }

    public function searchIngredient(Request $request)
    {
        $ingredients = Ingredient::where('name', 'like', '%' . $request->input('term') . '%')->whereNotIn('id', $request->input('avoid'))->get();
        return response()->json(json_encode($ingredients));
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
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $ingredient = Ingredient::find($id);
        $ingredient->delete();
    }
}
