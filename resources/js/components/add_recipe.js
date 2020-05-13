import React from 'react';
import ReactDOM from 'react-dom';
import Trix from "trix";
import axios from 'axios';

class AddRecipeComponent extends React.Component {
    constructor(props){
        super(props);
        this.trixInput = React.createRef();
        this.state = {
            recipeName: 'Nume Reteta',
            recipeSteps: 'Modul de preparare',
            difficulty: 0,
            portions: 4,
            preparationTime: 90
        }
    }

    render(){
        console.log(this.state)
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Adaugă o rețetă</div>
    
                            <div className="card-body form-group container">
                                <h1 className="text-center">
                                    <input
                                        type='text'
                                        value={this.state.recipeName}
                                        className="text-center border-0 recipe-name-input"
                                        onChange={this.changeRecipeName}
                                    ></input>
                                </h1>
                                <div>
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
                                    />
                                </div>
                                <div className='mt-3'>
                                    <h2 className='float-left'>Dificultate</h2>
                                    <div
                                        className={`ml-3 btn ${this.state.difficulty == 0 ? 'btn-success' : 'btn-outline-secondary'}`}
                                        data-difficulty='0'
                                        onClick={this.changeDifficulty}
                                    >
                                        Usor
                                    </div>
                                    <div
                                        className={`ml-3 btn ${this.state.difficulty == 1 ? 'btn-warning' : 'btn-outline-secondary'}`}
                                        data-difficulty='1'
                                        onClick={this.changeDifficulty}
                                    >
                                        Mediu
                                    </div>
                                    <div
                                        className={`ml-3 btn ${this.state.difficulty == 2 ? 'btn-danger' : 'btn-outline-secondary'}`}
                                        data-difficulty='2'
                                        onClick={this.changeDifficulty}
                                    >
                                        Complicat
                                    </div>
                                </div>
                                <div className='mt-3' style={{ minHeight: 30 }}>
                                    <h2 className='float-left mr-3'>Numarul de portii</h2>
                                    {this.portions()}
                                </div>
                                <div className='mt-3 display-block' style={{ minHeight: 30 }}>
                                    <h2 className='float-left mr-3'>Timp de preparare</h2>
                                    {this.preparationTime()}
                                </div>
                                <div>
                                    <button className='display-block btn btn-primary float-right' onClick={this.handleSubmit}>Adaugă</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleSubmit = () => {
        axios({
            method: 'POST',
            url: '/addRecipe',
            data: JSON.stringify({
                name: this.state.recipeName,
                body: this.state.recipeSteps,
                dificulty: this.state.difficulty,
                portions: this.state.portions,
                preparation_time: this.state.preparationTime
            })
        })
        .then(function (response) {
            window.location = response.data.redirect;
        })
    }

    changeRecipeName = (event) => {
        this.setState({
            recipeName: event.currentTarget.value
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

    changeDifficulty = (event) => {
        this.setState({
            difficulty: parseInt(event.currentTarget.getAttribute("data-difficulty"))
        })
    }

    changePortions = (event) => {
        this.setState({
            portions: parseInt(event.currentTarget.getAttribute("data-portions"))
        })
    }

    changePreparationTime = (event) => {
        let newPreparationTime = this.state.preparationTime + parseInt(`${event.target.innerHTML}10`);
        if (newPreparationTime < 0) { return; }
        this.setState({
            preparationTime: newPreparationTime
        })
    }

    portions = () => {
        return (
            <div className='float-left'>
                {
                [1,2,3,4,5,6].map((portionNumber) => {
                    let classes = `btn portion-div btn btn-outline-success ${portionNumber <= this.state.portions ? 'btn-success' : ''}`
                    return(
                        <div
                            className={classes}
                            onClick={this.changePortions}
                            key={`portion_${portionNumber}`}
                            data-portions={portionNumber}
                        >
                        </div>
                    )
                })
                }
            </div>
        )
    }

    preparationTime = () => {
        let hours = Math.floor(this.state.preparationTime / 60);
        hours = hours > 9 ? hours : `0${hours}`
        let minutes = this.state.preparationTime % 60
        minutes = minutes > 9 ? minutes : `0${minutes}`
        return(
            <div className='float-left'>
                <h3>
                    <span style={{cursor:'pointer'}} onClick={this.changePreparationTime}>-</span>
                    {hours}:{minutes}
                    <span style={{cursor:'pointer'}} onClick={this.changePreparationTime}>+</span>
                </h3>
            </div>
        )
    }
}

export default AddRecipeComponent;

if (document.getElementById('add-recipe')) {
    ReactDOM.render(<AddRecipeComponent />, document.getElementById('add-recipe'));
}
