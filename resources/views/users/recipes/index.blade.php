@extends('layouts.app')

@section('content')
<div class="container">
    @if(count($recipes) > 0)
        <h2 class='text-center'>Rețetele mele</h2>
        <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nume</th>
                <th scope="col">Fel</th>
                <th scope="cole">Dificultate</th>
                <th scope="col">Numar portii</th>
                <th scope="col">Timp</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
                @foreach ($recipes as $recipe)
                    <tr>
                    <th scope="row">{{$recipe->id}}</th>
                    <td>{{$recipe->name}}</td>
                    <td>{{$recipe->type}}</td>
                    <td>{{$recipe->dificulty}}</td>
                    <td>{{$recipe->portions}}</td>
                    <td>{{$recipe->preparation_time}}</td>
                    <td>
                      <a class='btn btn-dark' href={{ route('users.recipes.edit', [$recipe->user_id, $recipe->id]) }}>Edit</a>
                    </td>
                    <td>
                      {!!Form::open([
                        'action' => ['RecipesController@destroy', $recipe->user_id, $recipe->id],
                        'method' => 'DELETE'
                      ])!!}
                          {{Form::submit('Delete', ['class'=>'btn btn-danger'])}}
                      {!! Form::close() !!}
                    </td>
                    </tr>
                @endforeach
            </tbody>
          </table>
    @else
        <h2 class='text-center'>Nu au fost găsite rețete!</h2>
    @endif
    @auth
      <div class='text-center'>
        <a class='btn btn-primary' href={{ route('users.recipes.create', Auth::id()) }}>Adaugă rețetă</a>
      </div>
    @endauth
</div>
@endsection
