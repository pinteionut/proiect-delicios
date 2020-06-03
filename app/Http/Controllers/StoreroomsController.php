<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Storeroom;
use App\User;
use App\IngredientStoreroom;

class StoreroomsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $storeroom = new Storeroom;
        $storeroom->user_id = $request->user_id;
        $storeroom->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        if($request->wantsJson()) {
            $user = User::find($id);
            $ingredients = $user->storeroom->ingredients;
            return response()->json(json_encode($ingredients));

        } else {
            return view('users.storeroom.show');
        }
    }

    public function add_ingredient(Request $request, $id)
    {
        $user = User::find($id);

        $ingredient_storeroom = new IngredientStoreroom;
        $ingredient_storeroom -> ingredient_id = $request->input('ingredient_id');
        $ingredient_storeroom -> storeroom_id = $user->storeroom->id;
        $ingredient_storeroom -> quantity = $request->input('quantity');
        $ingredient_storeroom -> save();
        
        $ingredients = $user->storeroom->ingredients;
        return response()->json(json_encode($ingredients));
    }

    public function remove_ingredient(Request $request, $id)
    {
        $user = User::find($id);

        IngredientStoreroom::where('ingredient_id', 'like', '%' . $request->input('ingredient_id') . '%')->where('storeroom_id', $user->storeroom->id) -> delete();
        
        $ingredients = $user->storeroom->ingredients;
        return response()->json(json_encode($ingredients));
    }
    
    public function update_ingredient(Request $request, $id)
    {
        $user = User::find($id);

        $ingredient_storeroom = IngredientStoreroom::where('ingredient_id', 'like', '%' . $request->input('ingredient_id') . '%')->where('storeroom_id', $user->storeroom->id) -> first();
        $ingredient_storeroom -> quantity = $request->input('quantity');
        $ingredient_storeroom -> save();

        $ingredients = $user->storeroom->ingredients;
        return response()->json(json_encode($ingredients));
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
        //
    }
}
