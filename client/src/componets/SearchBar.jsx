import {useState, useEffect} from "react";
import { getDiets, getRecipeName, getAllRecipes, orderFilter, cleanRecipe } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from '../styles/SearchBar.module.css'

import React from 'react'

export const SearchBar = (props) => {
  const [state, setState] = useState({name: ''});
  const [reset, setReset] = useState(false);
  const [reset2, setReset2] = useState(false);


  const dispatch = useDispatch();
  const diets = useSelector(state => state.diets);
  const backup = useSelector(state => state.backup)
  const recipes = useSelector(state => state.recipes)
  // const initial = useSelector(state => state.initial)


  useEffect(() => {
    if (!diets.length)dispatch(getDiets())
  })

  const handlerSubmit = e => {
    e.preventDefault();
    // dispatch(cleanRecipe());
    dispatch(getRecipeName(state.name));
    // e.target.value = '';
  }

  const handlerInputChange = e => {
    setState({
      ...state,
      name: e.target.value
    })
  }

  const handleReset = () => {
    dispatch(getAllRecipes());
    setReset(true);
    setReset2(true);
  }

  const handlerFilterDiets= e => {
    if(e.target.disabled === false){
      setReset2(true)
    }
    let az;
    let az2;
    let minMax;
    let score;
    // let maxMin;

    const options = e.target.value;
    const name = e.target.name;
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
      az2 = recipes.sort(function (a, b) {
        if (a.title < b.title) {
          return 1;
        }
        if (a.title > b.title) {
          return -1;
        }
        return 0;
      });
      dispatch(cleanRecipe())
      dispatch(orderFilter(az2))	
    }
    if(options === 'MinMax'){
      minMax = recipes.sort(function(a, b) {
        return a.score - b.score;
      });
      dispatch(cleanRecipe())
      dispatch(orderFilter(minMax))	
    }
    if(options === 'MaxMin'){
      minMax = recipes.sort(function(a, b) {
        return b.score - a.score;
      });
      dispatch(cleanRecipe())
      dispatch(orderFilter(minMax))	
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
      
      <input className={styles.input} type="text" placeholder="Search by name..." name="name" onChange={e => handlerInputChange(e)}/>
      <button  className={styles.button} type="submit" onClick={(e) => handlerSubmit(e)}>Search</button>

      {/* Orden alfabeticooooooooooo */}
      <div className={styles.select}>
        <select onClick={e => handlerFilterDiets(e)} name="Alphabetical">
          <option selected={reset} disabled={reset2} value='Alphabetical'>Alphabetical</option>
          <option value="AZ">A-Z</option>
          <option value="ZA">Z-A</option>
        </select>
          <div className={styles.select_arrow}>
          </div>
      </div>

      {/* Por scoreeeeeeeeee */}
      <div className={styles.select}>
        <select onClick={e => handlerFilterDiets(e)} name="Score">
          <option selected={reset} disabled={reset2}>Score</option>
          <option value="MinMax">Min - Max</option>
          <option value="MaxMin">Max - Min</option>
        </select>
          <div className={styles.select_arrow}>
          </div>
      </div>

      


      {/* Filtro por tipos de dieta */}
      <div className={styles.select}>
        <select onClick={e => handlerFilterDiets(e)} name="Diets">
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