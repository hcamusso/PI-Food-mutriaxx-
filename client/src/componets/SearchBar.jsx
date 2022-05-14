import {useState, useEffect} from "react";
import { getDiets, getRecipeName, getAllRecipes, orderFilter, cleanRecipe } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from '../styles/SearchBar.module.css'

import React from 'react'

export const SearchBar = (props) => {
  const [state, setState] = useState({name: ''});
  const [reset, setReset] = useState(false);
  const [reset2, setReset2] = useState(false);
  const [errors, setErrors] = useState({})


  const dispatch = useDispatch();
  const diets = useSelector(state => state.diets);
  const backup = useSelector(state => state.backup)
  const recipes = useSelector(state => state.recipes)
  // const initial = useSelector(state => state.initial)


  useEffect(() => {
    if (!diets.length)dispatch(getDiets())
  })

  useEffect(() => {
    validate()
}, [state.name]);


  const handlerSubmit = e => {
    e.preventDefault();
    // dispatch(cleanRecipe());
    
    state.name ? dispatch(getRecipeName(state.name)) : alert('name is required')
    setState({...state, name: ' '})
    // e.target.value = '';
  }

  const validate = () => {
    let error = {}
    let regularExpresion =  /^[a-zA-Z ]+$/gm;
    setErrors({});
    if(state.name){
      if(!regularExpresion.test(state.name)){
      error.name = 'Name is not valid'
    }
    setErrors(error)
    }
    
  }
  // console.log(recipes)
  const handlerInputChange = e => {
    
      setState({
      ...state,
      name: e.target.value
    })
    
    
  }

  const handleReset = () => {
    setReset(true);
    // setReset2(true);
    dispatch(cleanRecipe());
    dispatch(orderFilter(backup));
  }

  const handlerFilterDiets= e => {
    if(e.target.disabled === false){
      setReset2(true)
    }
    let az;
    let za;
    let minMax;
    // let score;
    let maxMin;

    const options = e.target.value;
    const name = e.target.name;
    if(options === 'Sort by'){
      dispatch(cleanRecipe())	
      dispatch(orderFilter(backup))	
    }
    if(options === 'AZ'){
      az = recipes.sort(function (a, b) {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        return 0;
      });
      dispatch(cleanRecipe())	
      dispatch(orderFilter(az))	
    }
    if(options === 'ZA'){
      za = recipes.sort(function (a, b) {
        if (a.title < b.title) {
          return 1;
        }
        if (a.title > b.title) {
          return -1;
        }
        return 0;
      });
      dispatch(cleanRecipe())
      dispatch(orderFilter(za))	
    }
    if(options === 'MinMax'){
      minMax = recipes.sort(function(a, b) {
        return a.score - b.score;
      });
      dispatch(cleanRecipe())
      dispatch(orderFilter(minMax))	
    }
    if(options === 'MaxMin'){
      maxMin = recipes.sort(function(a, b) {
        return b.score - a.score;
      });
      dispatch(cleanRecipe())
      dispatch(orderFilter(maxMin))	
    }
    else {
      const filter = backup.filter(r => r.diets.includes(options));
      filter[0] && dispatch(orderFilter(filter))
      // dispatch(getAllRecipes())
      // console.log(filter)
    }

  }


// console.log(backup)
  return (
    <div className={styles.container}>
      
      <input className={errors.name ? styles.inputoff : styles.input} type="text" placeholder="Search by name..." value={state.name} name="name" onChange={e => handlerInputChange(e)}/>
      <button disabled={errors.name ? true : false}  className={errors.name? styles.buttonoff :styles.button} type="submit" onClick={(e) => handlerSubmit(e)}>Search</button>

      {/* Ordeno */}
      <div className={styles.select}>
        <select disabled={recipes.error } onClick={e => handlerFilterDiets(e)} name="Sort">
          <option selected={reset} disabled={reset2} value='Sort'>Sort</option>
          <option disabled value="Alphabetically">alphabetically</option>
          <option value="AZ">A-Z</option>
          <option value="ZA">Z-A</option>
          <option disabled value="Score">by score</option>
          <option value="MinMax">Min - Max</option>
          <option value="MaxMin">Max - Min</option>
        </select>
          <div className={styles.select_arrow}>
          </div>
      </div>


      {/* Filtro por tipos de dieta */}
      <div className={styles.select}>
        <select disabled={recipes.error} onClick={e => handlerFilterDiets(e)} name="Diets">
        <option selected={reset} disabled={reset2} key={-1}>Diets</option>
            {diets && diets.map((d,i)=> {
                return <option key={i} value={d.name}>{d.name}</option>
            })}
        </select>
        <div className={styles.select_arrow}>
        </div>
      </div>
      <button  className={styles.button} type="submit" onClick={() => handleReset()}>All Recipes</button>


    </div>
  )
}