import React from 'react';
import axios from 'axios';

export default class RecipeRow extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: {},
        }
    }
    render(){
        const recipe = this.props.recipe;
        return(
            <div className='container w-100 bg-light mt-3 border p-3 shadow-lg discover-recipe-container' onClick={this.showRecipe}>
                    <div className='row'>
                        <h3 className='text-center w-100'>{ recipe.name }</h3>
                    </div>
                    <div className='row'>
                        <p className='text-center w-100'>
                            {recipe.preparation_time}
                            <i className='fa fa-clock-o ml-1'></i>
                        </p>
                    </div>
                    <div className='row'>
                        <p className='text-center w-100'>
                            {this.dificulty()}
                        </p>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <p className='text-center'>
                                <i className='fa fa-utensils mr-1'></i>
                                {`${recipe.portions} porții`}
                            </p>
                        </div>
                        <div className='col'>
                            <p className='text-center'>
                                {recipe.type}
                            </p>
                        </div>
                    </div>
                    <div className='row'>
                        <p className='text-center w-100'>
                            Rețetă adăugată de către {this.state.user.name || <i className="fas fa-spinner fa-spin"></i>}
                        </p>
                    </div>
            </div>
        )
    }

    showRecipe = () => {
        window.location = `/show_recipe/${this.props.recipe.id}`
    }

    dificulty = () => {
        let dificulty = 'Această rețetă este  ';
        switch(this.props.recipe.dificulty) {
            case 0: dificulty += 'ușor'; break;
            case 1: dificulty += 'mediu'; break;
            case 2: dificulty += 'dificil'; break;
        }
        dificulty += ' de realizat!';
        return dificulty;
    }

    componentDidMount = () => {
        const that = this;
        axios({
            method: 'GET',
            url: `/user/${this.props.recipe.user_id}`,
        })
        .then(function (response) {
            that.setState({user: JSON.parse(response.data)});
        })
    }
}