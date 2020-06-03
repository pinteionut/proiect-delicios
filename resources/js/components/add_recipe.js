import React from 'react';
import ReactDOM from 'react-dom';
import Trix from "trix";
import axios from 'axios';

class AddRecipeComponent extends React.Component {
    constructor(props){
        super(props);
        this.trixInput = React.createRef();
        this.state = {
            recipeSteps: 'Modul de preparare',
            ingredients: [],
            foundIngredients: [],
            term: ''
        }
    }

    render(){
        console.log(this.state)
        return (
            <div className='container m-3 p-3 text-center'>
                <h3>Adaugă Rețetă</h3>
                <form className='m-auto'>
                    <input
                        className='form-control m-3 p-3'
                        type='text'
                        placeholder='Nume Rețetă'
                        data-name='name'
                        onChange={this.handleChange}
                    >
                    </input>
                    <input
                        className='form-control m-3 p-3'
                        type='text'
                        placeholder='Fel'
                        data-name='type'
                        onChange={this.handleChange}
                    >
                    </input>
                    <div className='m-3 text-left'>
                        <input
                            type='hidden'
                            id='trix'
                            value={this.state.recipeSteps}
                            onChange={this.changeRecipeSteps}
                        ></input>
                        <trix-editor
                            input='trix'
                            ref={this.trixInput}
                            onChange={this.changeRecipeSteps}
                            style={{backgroundColor: 'white'}}
                        />
                    </div>
                    <select name="difficulty" className="form-control m-3" data-name='difficulty' onChange={this.handleChange} defaultValue={-1}>
                        <option className='text-muted form-control' value="-1" disabled>Dificultate</option>
                        <option value="0">Ușor</option>
                        <option value="1">Mediu</option>
                        <option value="2">Dificil</option>
                    </select>
                    <input
                        className='form-control m-3 p-3'
                        type='number'
                        min='0'
                        placeholder='Numărul de porții'
                        data-name='portions'
                        onChange={this.handleChange}
                    >
                    </input>
                    <input
                        className='form-control m-3 p-3'
                        type='number'
                        placeholder='Timpul de preparare (minute)'
                        data-name='preparation_time'
                        onChange={this.handleChange}
                    >
                    </input>
                    <div>
                        <p className='text-left'>Ingrediente:</p>
                        <ul>
                            {
                                this.state.ingredients.map(ingredient => (
                                    <li className='text-left mt-1' key={`ingredient-${ingredient.id}`}>
                                        {ingredient.name}
                                        <input
                                            className='ml-3 mr-1 ingredient-quantity'
                                            type='number'
                                            placeholder={ingredient.default_quantity}
                                            data-id={ingredient.id}
                                            onChange={this.changeIngredientQuantity}
                                        ></input>
                                        x {ingredient.measure_type}
                                        <i className='fa fa-times text-danger ml-3 pull-right' data-id={ingredient.id} onClick={this.removeIngredient}></i>
                                    </li>
                                ))
                            }
                        </ul>
                        <input
                            className='form-control m-3 p-3'
                            type='text'
                            placeholder='Caută ingredient'
                            data-name='term'
                            onChange={this.handleChange}
                        >
                        </input>
                        <div className='btn btn-primary' onClick={this.searchIngredient}><i className='fa fa-search'></i></div>
                        <div className='container'>
                            <div className='row'>
                                {
                                    this.state.foundIngredients === 404 ? <div className='btn btn-danger col m-3'>Ingredientul nu a fost găsit.</div>
                                    :    this.state.foundIngredients.map(ingredient => (
                                            <div className='btn btn-primary col m-3' key={`found-ingredient-${ingredient.id}`} data-id={ingredient.id} onClick={this.selectIngredient}>{ingredient.name}</div>
                                        )) 

                                }
                            </div>
                            <div className='row m-3 text-center w-100'>
                                <p className='w-100'>
                                    <i className='fa fa-info mr-1'></i>Nu găsești ingredientul dorit? Îl poți adăuga chiar tu în baza noastră de date:
                                    <span className='text-info ml-3 add-ingredient' onClick={() => {window.open('/ingredients/create');}}>Adaugă ingredient!</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='btn btn-success mt-3' onClick={this.handleSubmit}>Adaugă</div>
                </form>
            </div>
        );
    }

    changeIngredientQuantity = (event) => {
        const updatedIngredients = this.state.ingredients;
        let changedIngredient = updatedIngredients.filter(ingredient => ingredient.id === parseInt(event.currentTarget.dataset.id))[0];
        changedIngredient.quantity = event.currentTarget.value;
        this.setState({
            ingredients: updatedIngredients
        })
    }

    removeIngredient = (event) => {
        this.setState({
            ingredients: this.state.ingredients.filter(ingredient => ingredient.id != parseInt(event.currentTarget.dataset.id))
        })
    }

    selectIngredient = (event) => {
        const selectedIngredient = this.state.foundIngredients.filter(foundIngredient => foundIngredient.id === parseInt(event.currentTarget.dataset.id))[0];
        let newIngredients = this.state.ingredients;
        newIngredients.push(selectedIngredient);
        this.setState({
            ingredients: newIngredients,
            foundIngredients: []
        })
    }

    searchIngredient = (event) => {
        const that = this;
        axios({
            method: 'GET',
            url: '/searchIngredient',
            params: {
                term: that.state.term,
                avoid: that.state.ingredients.length ? that.state.ingredients.map(ingredient => ingredient.id) : [-1],
            }
        })
        .then(function (response) {
            const foundIngredients = JSON.parse(response.data)
            that.setState({
                foundIngredients: foundIngredients.length ? foundIngredients : 404
            })
        })
    }

    handleChange = (event) => {
        this.setState({ [event.currentTarget.dataset.name]: event.currentTarget.value})
    }

    handleSubmit = () => {
        axios({
            method: 'POST',
            url: '/addRecipe',
            data: JSON.stringify({
                name: this.state.name,
                body: this.state.recipeSteps,
                dificulty: this.state.difficulty,
                portions: this.state.portions,
                preparation_time: this.state.preparation_time,
                ingredients: this.state.ingredients,
                type: this.state.type,
            })
        })
        .then(function (response) {
            window.location = response.data.redirect;
        })
    }

    changeRecipeSteps = (newRecipeSteps) => {
        this.setState({
            recipeSteps: newRecipeSteps
        })
    }

    componentDidMount = () => {
        this.trixInput.current.addEventListener('trix-change', event => {
            this.changeRecipeSteps(event.target.innerHTML);
        })
        this.trixInput.current.addEventListener("trix-file-accept", event => {
            event.preventDefault();
          })
    }
}

export default AddRecipeComponent;

if (document.getElementById('add-recipe')) {
    ReactDOM.render(<AddRecipeComponent />, document.getElementById('add-recipe'));
}
