import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes } from "../redux/actions";
import {RecipeCard} from "./RecipeCard"
import { SearchBar } from "./SearchBar";
import styles from '../styles/recipes.module.css';
import error from '../styles/images/404-error.png'
import React from 'react'
import { Pagination } from "./Pagination";
import loading from '../styles/images/loading.gif'

export const Home = (props) => {
    const [page, setPage] = useState(1) //pagina
    const [lot, setLot] = useState(6) //lote de recetas
    const recipes = useSelector(state => state.recipes);
    const max = recipes.length / lot; //numero de paginas
    // console.log(max)
    const dispatch = useDispatch();

    useEffect(() => {
        !recipes.length && dispatch(getAllRecipes())
    }, [])
    

  return (
    <>
        <div className={styles.container}>
            <h1 className={styles.title}>Simple and Tasty Recipes<span>&#160;</span></h1>
            <p>Find cooking inspiration on <b>CookBook</b>. Discover recipes and how-tos based on the food you love 💛.</p>
            
        </div>
        <SearchBar/>        
                    
        <div className={styles.root}>
            {recipes.error? <><img className={styles.error} src={error} alt="404 Error"/> <p>Recipe doesn't exist 😕</p> </>: !recipes[0]? <img src={loading} alt='loading'/> : recipes && recipes.slice((page - 1) * lot, (page - 1) * lot + lot).map((r,i) => {
                return <RecipeCard key={i} id={r.id} image={r.image} title={r.title} diets={r.diets} score={r.score}/>
            })}
            
        </div>
        {recipes[0] && <Pagination page={page} setPage={setPage} setLote={setLot} max={max}/>}

    </>
        
  )
}

export default Home