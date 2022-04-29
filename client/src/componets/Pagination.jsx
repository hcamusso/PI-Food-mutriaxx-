import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import styles from '../styles/recipes.module.css'


export const Pagination = ({page, setPage, max}) => {
    
    const recipes = useSelector(state => state.recipes)

 

    useEffect(() => {
        setPage(1)

    }, [recipes])
    

    const buttonIndex = (i) =>{
        setPage(i)
    }

    const buttons = new Array(Math.ceil(max)).fill(true)
    // console.log(buttons)
    

  return (
    <div>
        {buttons && buttons.map((e,i) => {
            return <button key={i} onClick={() => buttonIndex (i+1)} className={page === i+1? styles.buttonactivo : styles.button}>{i+1}</button>
        })}
    </div>
  )
}
