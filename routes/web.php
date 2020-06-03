<?php

use Illuminate\Support\Facades\Route;
use App\User;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::resource("users.recipes", 'RecipesController');
Route::resource("ingredients", 'IngredientsController');

Route::get('/users/{id}/storeroom', 'StoreroomsController@show')->name('storeroom');
Route::post('/users/{id}/add-to-storeroom', 'StoreroomsController@add_ingredient');
Route::post('/users/{id}/remove-from-storeroom', 'StoreroomsController@remove_ingredient');
Route::post('/users/{id}/update-in-storeroom', 'StoreroomsController@update_ingredient');

Route::get('/discover_recipes', 'PagesController@discover_recipes')->name('discover_recipes');
Route::get('/show_recipe/{id}', 'PagesController@show_recipe');

Route::post('addRecipe', 'RecipesController@addRecipe');

Route::post('createIngredient', 'IngredientsController@store');
Route::get('searchIngredient', 'IngredientsController@searchIngredient');

Route::get('recipe_types', 'RecipesController@types')->name('recipe_types');

Route::get('user/{id}', function ($id) {
    $user = User::find($id);
    return response()->json(json_encode($user));
});
