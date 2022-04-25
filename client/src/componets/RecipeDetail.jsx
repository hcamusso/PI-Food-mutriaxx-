import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipeId } from '../redux/actions';
// import Styles from '../styles/RecipeDetail.module.css'

export const RecipeDetail = (props) => {
  const recipe = useSelector(state => state.recipe);

    const dispatch = useDispatch();
    React.useEffect(() => {
        if(!recipe.length){
          dispatch(getRecipeId(props.match.params.id))
        }
    }, [])
  return (
    <div>
      {recipe.error && <p>{recipe.error}</p>}
        {recipe.title && <h2>{recipe.title}</h2>}
        {recipe.image && <img src={recipe.image} alt={recipe.name}/>}
        {<h2>Summary</h2>}
        {recipe.summary && <p dangerouslySetInnerHTML={{ __html:recipe.summary}}/>}
        {<h2>Diets</h2>}
        {recipe.diets && recipe.diets.map((d,i) => <p key={i}>{d}</p>)}
        {<h2>DishTypes</h2>}
        {recipe.dishTypes && recipe.dishTypes.map((d,i) => <p key={i}>{d}</p>)}
        {<h2>Score</h2>}
        {recipe.score && <p>{recipe.score}</p>}
        {<h2>Health Score</h2>}
        {recipe.healthScore && <p>{recipe.healthScore}</p>}
        {<h2>Steps</h2>}
        {recipe.steps &&  <p dangerouslySetInnerHTML={{ __html:recipe.steps}}/>}
    </div>
  )
}


