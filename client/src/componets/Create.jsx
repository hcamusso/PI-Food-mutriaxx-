import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createRecipe, getDiets, getAllRecipes } from "../redux/actions";
import styles from '../styles/Create.module.css'
import Modal from './Modal'

class Create extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            summary: '',
            score: 1,
            healthScore: 1,
            steps: '',
            image: '',
            diets: new Array(11).fill(false),
            disabled: true,
            modal: false,
            // new Array(this.props.diets.length).fill(false)
            errors: {
                // title: 'Title is required',
                // summary: 'Summary is required',
                // score: 'Score is required',
                // healthScore: 'Health score is required',
                // steps: 'Instructions are required',
                // diets: ''
            }
        }
    }
          
    componentDidMount(){
        this.props.getDiets();
        // this.props.getAllRecipes();
    }
    componentDidUpdate(){
    }

    validate(){

        this.setState({
            ...this.state,
            errors: {}
        }, () => {
            let errors = {};
        // console.log(input.title)
        if(!this.state.title){
            errors.title = 'Title is required';
        }else if(!isNaN(this.state.title)){
            errors.title = 'No puede ser numeroooo'
        }
        
        if(!this.state.summary){
            errors.summary = 'Summary is required';
        }
        
        if(this.state.score < 1 || isNaN(this.state.score)){
            errors.score = 'Score debe ser mayor o igual a 1';
        }
        
        if(this.state.healthScore < 1 || isNaN(this.state.healthScore)){
            errors.healthScore = 'Health Score debe ser un numero mayor o igual a 1';
        }
        
        if(!this.state.steps){
            errors.steps = 'Instructions are required.';
        }
        
        if(!this.state.diets.includes(true)){
            errors.diets = 'Debe seleccionar al menos un tipo de dieta.';
        }
        this.setState({
            ...this.state,
            errors
        })
        })

        

        
    }

    handlerInputChange = (e, position) => { 

        const updateCheckedState = this.state.diets.map((check, index) => index === position? !check : check)
        this.setState({
            ...this.state,
            disabled: false,
            [e.target.name] : e.target.value,
            diets: updateCheckedState,
            // errors: this.validate({
            //     [e.target.name] : e.target.value.trim()
            // })
        }, () => this.validate())

        // this.validate()

        // console.log(this.state, e.target.value)
        
    }
    
    async handlerSubmit(e){
        e.preventDefault();
        this.props.createRecipe({
            title: this.state.title,
            summary: this.state.summary,
            score: this.state.score,
            healthScore: this.state.healthScore,
            steps: this.state.steps,
            image: this.state.image ? this.state.image : 'https://spoonacular.com/recipeImages/image.jpg' ,
            diets: this.state.diets.map((e,i) => e === true ? i+1 : 0).filter(e => e !== 0)
        });
        this.setState({
            title: '',
            summary: '',
            score: '',
            healthScore: '',
            steps: '',
            image: '',
            diets: '',
            modal: true
        })
        this.props.getAllRecipes();
    }
    

    render() {
        // console.log(this.state)
        // console.log(this.props.diets);
      return (
          <div className={styles.root}>
                <div className={styles.container}>
                    <h1>Create your own recipe</h1>

                    <p>Add a new recipe to CookBook.</p>
                    <br />
                    <form className={styles.form}>
                        <label className={styles.label} htmlFor="">Title:</label>
                        <input className={styles.input}
                            required
                            value={this.state.title}
                            name='title' 
                            id={this.state.title} 
                            type="text" 
                            placeholder="Type the title" 
                            onChange={e => this.handlerInputChange(e)} 
                        />
                        <label>{this.state.errors.title && this.state.errors.title}</label>
                        <br />
                        <label className={styles.label} htmlFor="">Summary:</label>
                        <textarea className={styles.input}
                            value={this.state.summary} 
                            placeholder='Type the summary' 
                            name="summary" 
                            id={this.state.summary} 
                            cols="30" 
                            rows="10" 
                            onChange={e => this.handlerInputChange(e)}>    
                        </textarea>
                        <label>{this.state.errors.summary && this.state.errors.summary}</label>

                        <br />
                        <label className={styles.label}>Score:</label>
                        <input className={styles.input}
                            value={this.state.score}
                            type="number"
                            min={1}
                            max={100} 
                            name="score" 
                            id="score"  
                            onChange={e => this.handlerInputChange(e)}
                        />
                        <label>{this.state.errors.score && this.state.errors.score}</label>

                        <br />
                        <label className={styles.label}>Health Score: </label>
                        <input className={styles.input} 
                            value={this.state.healthScore}
                            min={1}
                            max={100} 
                            type="number" 
                            name="healthScore" 
                            id="healthScore"  
                            onChange={e => this.handlerInputChange(e)}
                        />
                        <label>{this.state.errors.healthScore && this.state.errors.healthScore}</label>

                        <br />
                        <label className={styles.label}>Instructions:</label>
                        <textarea className={styles.input} 
                            value={this.state.steps}
                            name="steps" 
                            id="steps" 
                            cols="30" 
                            rows="10" 
                            onChange={e => this.handlerInputChange(e)}>    
                        </textarea>
                        <label>{this.state.errors.steps && this.state.errors.steps}</label>

                        <br />
                        <label className={styles.label}>Image:</label>
                        <input className={styles.input}
                            value={this.state.image}
                            type="url" 
                            placeholder="Enter the URL" 
                            name="image" 
                            id="image"  
                            onChange={e => this.handlerInputChange(e)}
                        />
                        <br />
                        <label className={styles.label}>Diets:</label>
                        <div className={styles.form2}>
                            {this.props.diets && this.props.diets.map((d,i) =>{ 
                                return (
                                    <div key={i} className={styles.label2}>
                                        <input
                                            checked={this.state.diets[i]}
                                            onChange={e => this.handlerInputChange(e, i)}
                                            className={styles.input2}
                                            type="checkbox"
                                            value={this.state.diets[i]} />
                                        <label key={i}>{d.name}</label>
                                    </div>
                                    
                                )}
                            )}
                        <label>{this.state.errors.diets && this.state.errors.diets}</label>
                        </div>
                        
                        <button disabled={this.state.errors.title || this.state.errors.summary || this.state.errors.score || this.state.errors.healthScore || this.state.errors.steps || this.state.errors.diets || this.state.disabled ? true : false} onClick={(e)=> this.handlerSubmit(e)}>create</button>
                        
                    </form>   
                </div>
                <Modal state={this.state.modal}>
                    <div className={styles.content}>
                        {this.props.info.hasOwnProperty('error') ? <h2>Missing data</h2> : this.props.info.hasOwnProperty('successful') ? <h2>The recipe was created correctly</h2> : <h2>Error</h2>}
                        {/* <h1>{this.state.info}</h1> */}
                        <br />
                        <Link to='/home'><button className={styles.button}>Done</button></Link>
                    </div>
                    
                </Modal>
          </div>
          
        
      );
    }
}



const mapStateToProps = state => {
    return{
        diets: state.diets,
        info: state.info
    }
}

const mapDispatchToProps = {
    getDiets,
    createRecipe,
    getAllRecipes
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);