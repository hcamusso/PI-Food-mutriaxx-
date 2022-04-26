import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipeId } from '../redux/actions';
import styles from '../styles/RecipeDetail.module.css'

export const RecipeDetail = (props) => {
  const recipe = useSelector(state => state.recipe);

    const dispatch = useDispatch();
    React.useEffect(() => {
        if(!recipe.length){
          dispatch(getRecipeId(props.match.params.id))
        }
    }, [])
  return (
    <div className={styles.fondo}>
    <div className={styles.root}>
      {recipe.error ? <p>Error 404: </p>: !recipe.hasOwnProperty('title')? <p>Cargando...</p> :
        <div className={styles.container}>
          <div className={styles.marco}><p className={styles.title}>{recipe.title}</p> </div>
          <img className={styles.image} src={recipe.image} alt={recipe.title}/>
          <h4 className={styles.subtitle}>Summary</h4>
          <p className={styles.text} dangerouslySetInnerHTML={{ __html:recipe.summary}}/>
          <h4 className={styles.subtitle}>Diets </h4>
          {recipe.diets && <p className={styles.text}>{recipe.diets.join(', ')+'.'}</p>}
          {recipe.dishTypes && <h4 className={styles.subtitle}>Dish Types</h4>}
          {recipe.dishTypes && <p className={styles.text}>{recipe.dishTypes.join(', ')+'.'}</p>}
          <div className={styles.table}>
          <h4 className={styles.subtitle}>⭐</h4><p>{recipe.score}</p>
          <h4 className={styles.subtitle}>🥑</h4><p>{recipe.healthScore}</p>
          </div>
          {recipe.steps && <h4 className={styles.subtitle}>Steps</h4>}
          {recipe.steps &&  <p className={styles.text} dangerouslySetInnerHTML={{ __html:recipe.steps}}/>}
        </div>
      }

    </div>
    </div>
  )
}


