import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
const parse = require('html-react-parser');
const difficulties = ['ușor', 'mediu', 'dificil']

export default class ShowRecipe extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log(this.state)
        const { recipe } = this.state;
        if (!recipe) {
            return(
                <div className='w-100 text-center mt-5'>
                    <i className='text-center fa fa-spinner fa-spin fa-10x'></i>
                </div>
            )
        }
        return(
            <div className='container shadow-lg border p-3'>
                <i className="far fa-3x fa-arrow-alt-circle-left position-absolute" onClick={() => window.location = '/discover_recipes'}></i>
                <h1 className='text-center'>{recipe.name}</h1>
                <p className='text-center text-muted'>{recipe.type}</p>
                <div>
                    <h3 className='text-success'>Modul de preparare</h3>
                    <hr></hr>
                    {parse(recipe.body)}
                </div>
                <hr></hr>
                <div>
                    <p><i className='fa fa-clock-o ml-1'></i> Timpul de preparare: {recipe.preparation_time} minute</p>
                </div>
                <hr></hr>
                <div>
                    <p><i className='fa fa-utensils mr-1'></i> Numărul de porții: {recipe.portions}</p>
                </div>
                <hr></hr>
                <div>
                    <h4> Această rețetă este {difficulties[parseInt(recipe.dificulty)]} de realizat.</h4>
                </div>
                <hr></hr>
                <div>
                    <h3 className='text-success'>Ingrediente</h3>
                    <hr></hr>
                    <ul>
                        {
                            recipe.ingredients.map(ingredient => (
                                <li className='text-left mt-1' key={`ingredient-${ingredient.id}`}>
                                    {ingredient.name}  {ingredient.pivot.quantity} x {ingredient.measure_type}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='text-center'>Rețetă adăugată de: {recipe.chef}</div>
            </div>
        )
    }

    componentDidMount = () => {
        const that = this;
        axios({
            method: 'GET',
            url: window.location
        })
        .then(function (response) {
            const json = JSON.parse(response.data)
            let recipe = json[0];
            recipe.ingredients = json[1];
            recipe.chef = json[2];
            that.setState({
                recipe: recipe
            })
        })
    }
}

if (document.getElementById('show-recipe')) {
    ReactDOM.render(<ShowRecipe />, document.getElementById('show-recipe'));
}
