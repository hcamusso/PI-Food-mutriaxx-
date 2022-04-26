import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import styles from '../styles/recipes.module.css'


export const Pagination = ({page, setPage, max}) => {
    
    const recipes = useSelector(state => state.recipes)
    const [disable, setDisable] = useState(false)
    const [input, setInput] = useState(1)
    // useEffect(() => {
        
    //     if(Math.ceil(max) === 1){
    //         setDisable(true);
    //         setPage(1);
    //     }
    //     else{
    //         setDisable(false)
    //     }
    //     // console.log(disable)
    // })

    useEffect(() => {
        setPage(1)
    }, [recipes])
    
    const nextPage = () => {
        if(page < Math.ceil(max)){
            setInput(input + 1);
            setPage(page + 1); 
        }  
    }
    const prevPage = () => {
        if(page > 1){
            setInput(input - 1);
            setPage(page - 1);
        }
        
    }
    const buttonIndex = (i) =>{
        setPage(i)
    }

    const buttons = new Array(Math.ceil(max)).fill(true)
    // console.log(buttons)
    

  return (
    <div>
        <button disabled={disable} className={disable ? styles.buttonDisable :styles.button} onClick={prevPage}>prev</button>
        {buttons && buttons.map((e,i) => {
            return <button key={i} onClick={() => buttonIndex (i+1)} className={styles.button}>{i+1}</button>
        })}
        <button disabled={disable} className={disable ? styles.buttonDisable :styles.button} onClick={nextPage}>next</button>
    </div>
  )
}
