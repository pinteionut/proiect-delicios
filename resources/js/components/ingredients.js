import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class IngredientRow extends React.Component {
    render() {
        return(
            <div className='row'>
                <div className='col border'>
                    {this.props.ingredient.name}
                </div>
                <div className='col border'>
                    {this.props.ingredient.calories}
                </div>
                <div className='col border'>
                    {this.props.ingredient.default_quantity}
                </div>
                <div className='col border'>
                    {this.props.ingredient.type}
                </div>
                <div className='col border'>
                    {this.props.ingredient.diet}
                </div>
            </div>
        )
    }
}

export default class Ingredients extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ingredients: [] }
    }
    render() {
        console.log(this.state)
        return (
            <div className='container text-center'>
                <h1 className='text-center'>Ingrediente</h1>
                <div className='btn btn-success' onClick={this.addIngredient}>Adaugă ingredient!</div>
                <div className='row mt-3 bg-dark text-info'>
                    <div className='col border'>
                        Nume
                    </div>
                    <div className='col border'>
                        Calorii
                    </div>
                    <div className='col border'>
                        Cantitate
                    </div>
                    <div className='col border'>
                        Tip aliment
                    </div>
                    <div className='col border'>
                        Dietă
                    </div>
                </div>
                {
                    this.state.ingredients.map((ingredient, index) => {
                        return <IngredientRow ingredient={ingredient} key={`ingredient-${index}`}></IngredientRow>
                    })
                }
            </div>
        )
    }

    componentDidMount() {
        const that = this;
        axios({
            method: 'GET',
            url: '/ingredients',
        })
        .then(function (response) {
            console.log(response)
            that.setState({ingredients: JSON.parse(response.data)});
        })

    }

    addIngredient = () => {
        window.location = 'ingredients/create';
    }
}

if (document.getElementById('ingredients')) {
    ReactDOM.render(<Ingredients />, document.getElementById('ingredients'));
}
