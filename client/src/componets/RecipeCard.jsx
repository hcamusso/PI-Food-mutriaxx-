import React from 'react'
import {Link} from 'react-router-dom'
import styles from '../styles/recipeCard.module.css';


export const RecipeCard = (props) => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
          <Link to={`/recipes/${props.id}`}><img className={styles.image} src={props.image} alt='recipe'/></Link>
          <h4 className={styles.title}>{props.title}</h4>
          <br />
          <p className={styles.score}>⭐<b>{props.score}</b></p>
          <b className={styles.diets}>Diets:</b>
          <div className={styles.diets2}>{props.diets.join(', ')+'.'}</div>
      </div>
    </div>
  )
}
