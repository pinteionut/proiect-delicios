import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

export default class Storeroom extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ingredients: null,
            foundIngredients: [],
            term: '',
            editedIngredient: -1,
            quantity: -1
        }
    }

    render(){
        console.log(this.state)
        if(!this.state.ingredients) {
            return(
                <div className='w-100 text-center mt-5'>
                    <i className='text-center fa fa-spinner fa-spin fa-10x'></i>
                </div>
            )
        }
        const ingredients = this.state.ingredients;
        return(
            <div className='container shadow-lg m-3 p-3'>
                <h1>Cămara mea</h1>
                <div>
                    <h3 className='text-success'>Ingredientele din cămara mea</h3>
                    <hr></hr>
                    <ul>
                        {
                            ingredients.map(ingredient => (
                                <li className='text-left mt-1' key={`ingredient-${ingredient.id}`}>
                                    {ingredient.name}  {this.state.editedIngredient === ingredient.id ? 
                                        <input
                                            className='ml-3 mr-1 ingredient-quantity'
                                            type='number'
                                            defaultValue={ingredient.pivot.quantity}
                                            data-name='quantity'
                                            onChange={this.handleChange}
                                        ></input>
                                        : ingredient.pivot.quantity} x {ingredient.measure_type}
                                    { this.state.editedIngredient === ingredient.id ?
                                        <i className='fa fa-save text-success ml-3 pull-right' data-quantity={ingredient.pivot.quantity} data-id={ingredient.id} onClick={this.saveIngredient}></i>
                                        : 
                                        <i className='fa fa-edit text-info ml-3 pull-right' data-id={ingredient.id} onClick={this.editIngredient}></i>
                                    }
                                    <div className=' float-right text-danger ml-3'><i className='fa fa-times' data-id={ingredient.id} onClick={this.removeIngredient}></i> Șterge Ingredientul</div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <input
                    className='form-control m-3 p-3'
                    type='text'
                    placeholder='Caută ingredient'
                    data-name='term'
                    onChange={this.handleChange}
                >
                </input>
                <div className='w-100 text-center'>
                    <div className='btn btn-primary' onClick={this.searchIngredient}><i className='fa fa-search'></i></div>
                </div>
                <div className='container'>
                    <div className='row'>
                        {
                            this.state.foundIngredients === 404 ? <div className='btn btn-danger col m-3'>Ingredientul nu a fost găsit sau se află deja în cămară.</div>
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
        )
    }

    editIngredient = (event) => {
        this.setState({
            editedIngredient: parseInt(event.currentTarget.dataset.id)
        })
    }
    
    saveIngredient = (event) => {
        if (parseInt(event.currentTarget.dataset.quantity) === this.state.quantity) {
            this.setState({
                editedIngredient: -1,
                quantity: -1
            })
            return;
        }
        const that = this;
        axios({
            method: 'POST',
            url: window.location.pathname.replace('storeroom', 'update-in-storeroom'),
            params: {
                ingredient_id: event.currentTarget.dataset.id,
                quantity: this.state.quantity,
            }
        })
        .then(function (response) {
            that.setState({
                ingredients: JSON.parse(response.data),
                editedIngredient: -1,
                quantity: -1
            })
        })
    }

    removeIngredient = (event) => {
        const that = this;
        axios({
            method: 'POST',
            url: window.location.pathname.replace('storeroom', 'remove-from-storeroom'),
            params: {
                ingredient_id: event.currentTarget.dataset.id
            }
        })
        .then(function (response) {
            that.setState({
                ingredients: JSON.parse(response.data)
            })
        })
    }

    selectIngredient = (event) => {
        const selectedIngredient = this.state.foundIngredients.filter(foundIngredient => foundIngredient.id === parseInt(event.currentTarget.dataset.id))[0];
        const that = this;
        axios({
            method: 'POST',
            url: window.location.pathname.replace('storeroom', 'add-to-storeroom'),
            params: {
                ingredient_id: selectedIngredient.id,
                quantity: selectedIngredient.default_quantity
            }
        })
        .then(function (response) {
            that.setState({
                ingredients: JSON.parse(response.data),
                foundIngredients: []
            })
        })
    }
    
    handleChange = (event) => {
        this.setState({ [event.currentTarget.dataset.name]: event.currentTarget.value})
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

    componentDidMount = () => {
        const that = this;
        axios({
            method: 'GET',
            url: window.location,
        })
        .then(function (response) {
            const ingredients = JSON.parse(response.data)
            that.setState({
                ingredients: ingredients || []
            })
        })
    }
}

if (document.getElementById('storeroom')) {
    ReactDOM.render(<Storeroom />, document.getElementById('storeroom'));
}
