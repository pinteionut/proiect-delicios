import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class CreateIngredient extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return(
            <div className='container m-3 p-3 text-center'>
                <h3>Adaugă Ingredient</h3>
                <form className='w-50 m-auto'>
                    <input
                        className='form-control m-3 p-3'
                        type='text'
                        placeholder='Nume Ingredient'
                        data-name='name'
                        onChange={this.handleChange}
                    >
                    </input>
                    <input
                        className='form-control m-3 p-3'
                        type='number'
                        min='0'
                        placeholder='Calorii'
                        data-name='calories'
                        onChange={this.handleChange}
                    >
                    </input>
                    <input
                        className='form-control m-3 p-3'
                        type='number'
                        min='0'
                        placeholder='Cantitate implicită'
                        data-name='default_quantity'
                        onChange={this.handleChange}
                    >
                    </input>
                    <input
                        className='form-control m-3 p-3'
                        type='text'
                        placeholder='Unitate de măsură'
                        data-name='measure_type'
                        onChange={this.handleChange}
                    >
                    </input>
                    <input
                        className='form-control m-3 p-3'
                        type='text'
                        placeholder='Tip Aliment'
                        data-name='type'
                        onChange={this.handleChange}
                    >
                    </input>
                    <input
                        className='form-control m-3 p-3'
                        type='text'
                        placeholder='Dietă'
                        data-name='diet'
                        onChange={this.handleChange}
                    >
                    </input>
                    <div className='btn btn-success' onClick={this.handleSubmit}>Adaugă</div>
                </form>
            </div>
        )
    }

    handleChange = (event) => {
        this.setState({ [event.currentTarget.dataset.name]: event.currentTarget.value})
    }

    handleSubmit = () => {
        axios({
            method: 'POST',
            url: '/createIngredient',
            data: JSON.stringify({
                name: this.state.name,
                calories: this.state.calories,
                type: this.state.type,
                diet: this.state.diet,
                default_quantity: this.state.default_quantity,
                measure_type: this.state.measure_type,
            })
        })
        .then(function (response) {
            window.location = response.data.redirect;
        })
    }
}

if (document.getElementById('create-ingredient')) {
    ReactDOM.render(<CreateIngredient />, document.getElementById('create-ingredient'));
}
