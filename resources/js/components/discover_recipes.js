import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import RecipeRow from './recipe_row';

export default class DiscoverRecipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            filters: {
                type: [],
                ingredients: null
            },
            recipeTypes: [],
        }
    }

    render() {
        console.log(this.state)
        return (
            <div className='container mb-5'>
                <h1 className='text-center'>Rețete</h1>
                <div className='container'>
                    <h2 className='text-center bg-dark text-light'>Filtre</h2>
                    <p className='float-left pr-5'>Felul: </p>
                    <div>
                        {
                            this.state.recipeTypes.map((type, index) => (
                                <div className="form-check" key={`type-${index}`}>
                                    <input className="form-check-input" type="checkbox" value={type} id={type} data-name='type' onChange={this.handleTypeChange}></input>
                                    <label className="form-check-label" htmlFor={type}>
                                        {type}
                                    </label>
                                </div>
                            ))
                        }
                    </div>
                    <p className='float-left mt-3'>Ingrediente necesare: </p>
                    <div className='float-left mt-3'>
                        <div className='float-left ml-1' id='ingredients-filter'>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="ingredients" id="none" value="none" data-name='ingredients' onClick={this.handleIngredientsChange}></input>
                                <label className="form-check-label" htmlFor="none">
                                    Niciunul
                                </label>
                            </div>
                        </div>
                        <div className='float-left ml-1'>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="ingredients" id="some" value="some" data-name='ingredients' onClick={this.handleIngredientsChange}></input>
                                <label className="form-check-label" htmlFor="some">
                                    Unele
                                </label>
                            </div>
                        </div>
                        <div className='float-left ml-1'>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="ingredients" id="all" value="all" data-name='ingredients' onClick={this.handleIngredientsChange}></input>
                                <label className="form-check-label" htmlFor="all">
                                    Toate
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                {  this.state.recipes.length === 0 && this.noRecipesContent() }
                <div className='mt-5'>
                    {   this.state.recipes && 
                        this.state.recipes.map((recipe, index) => {
                            return <RecipeRow recipe={recipe} key={`recipe-${index}`}></RecipeRow>
                        })
                    }
                </div>
            </div>
        )
    }

    noRecipesContent = () => {
        if(this.state.filters.ingredients === null) {
            return (
                <div className='shadow-lg p-3 container d-block mt-5'>
                    Nu există rețete disponibile.
                </div>
            )
        }
        if(this.state.filters.ingredients === 'none') {
            return (
                <div className='shadow-lg p-3 container d-block mt-5'>
                    Ai ingrediente necesare pentru rețetele ce corespund filtrelor de mai sus! Actualizează filtrul de Ingrediente necesare de mai sus și... Poftă bună!
                </div>
            )
        }
        if(this.state.filters.ingredients === 'all') {
            return (
                <div className='shadow-lg p-3 container d-block mt-5'>
                    Din păcate nu ai toate ingredientele necesare pentru rețetele ce corespund filtrelor de mai sus.. e timpul pentru cumpărături!
                    <p>
                        <i className='fa fa-info'></i> Poți adăuga ingrediente în Cămara ta folosind opțiunea Cămara Mea din meniu.
                    </p>
                </div>
            )
        }
    }

    handleIngredientsChange = () => {
        let newFilters = this.state.filters;
        newFilters.ingredients = document.querySelector('input[name="ingredients"]:checked').value
        this.setState({ filters: newFilters, filterChanged: true })
    }

    componentDidUpdate = () => {
        if(this.state.filterChanged) {
            this.getRecipes();
        }
    }

    handleTypeChange = (event) => {
        let newFilters = this.state.filters;
        if (event.currentTarget.checked) {
            newFilters[event.currentTarget.dataset.name].push(event.currentTarget.value);
        }
        else {
            newFilters[event.currentTarget.dataset.name] = newFilters[event.currentTarget.dataset.name].filter( name => name != event.currentTarget.value);
        }
        this.setState({ filters: newFilters, filterChanged: true })
    }

    componentDidMount = () => {
        this.getRecipes();
        const that = this;
        axios({
            method: 'GET',
            url: '/recipe_types',
        })
        .then(function (response) {
            that.setState({recipeTypes: JSON.parse(response.data)});
        })
    }

    getRecipes = () => {
        const that = this;
        axios({
            method: 'GET',
            url: '/users/-1/recipes',
            params: {
                type: that.state.filters.type,
                needed_ingredients: that.state.filters.ingredients,
                filters_on: (that.state.filters.type.length || that.state.filters.ingredients) ? true : false
            }
        })
        .then(function (response) {
            that.setState({recipes: JSON.parse(response.data), filterChanged: false});
        })
    }
}

if (document.getElementById('discover-recipes')) {
    ReactDOM.render(<DiscoverRecipes />, document.getElementById('discover-recipes'));
}
