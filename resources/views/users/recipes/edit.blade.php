@extends('layouts.app')

@section('content')
<div class="container">
    <h2 class='text-center'>Editează rețeta</h2>
    {!! Form::open([
        'action' => ['RecipesController@update', $user_id, $recipe->id],
        'method' => 'PUT',
        'enctype' => 'multipart/form-data']
    ) !!}
        <div class="form-group row">
            {{Form::label('name', 'Nume', ['class' => 'col-sm-2 col-form-label text-right'])}}
            <div class="col-sm-10">
                {{Form::text('name', $recipe->name, ['class' => 'form-control'])}}
            </div>
        </div>
        <div class="form-group row">
            {{Form::label('body', 'Mod de preparare', ['class' => 'col-sm-2 col-form-label text-right'])}}
            <div class="col-sm-10">
                {{Form::textArea('body', $recipe->body, ['class' => 'form-control'])}}
            </div>
        </div>
        <div class="form-group row">
            {{Form::label('type', 'Fel', ['class' => 'col-sm-2 col-form-label text-right'])}}
            <div class="col-sm-10">
                {{Form::text('type', $recipe->type, ['class' => 'form-control'])}}
            </div>
        </div>
        <div class="form-group row">
            {{Form::label('dificulty', 'Dificultate', ['class' => 'col-sm-2 col-form-label text-right'])}}
            <div class="col-sm-10">
                {{Form::number('dificulty', $recipe->dificulty, ['class' => 'form-control'])}}
            </div>
        </div>
        <div class="form-group row">
            {{Form::label('portions', 'Număr Porții', ['class' => 'col-sm-2 col-form-label text-right'])}}
            <div class="col-sm-10">
                {{Form::number('portions', $recipe->portions, ['class' => 'form-control'])}}
            </div>
        </div>
        <div class="form-group row">
            {{Form::label('preparation_time', 'Timp Preparare', ['class' => 'col-sm-2 col-form-label text-right'])}}
            <div class="col-sm-10">
                {{Form::number('preparation_time', $recipe->preparation_time, ['class' => 'form-control'])}}
            </div>
        </div>
        <div class='text-center'>
            {{Form::submit('Editează', ['class'=>'btn btn-primary text-center'])}}
        </div>
    {!! Form::close() !!}
</div>
@endsection
