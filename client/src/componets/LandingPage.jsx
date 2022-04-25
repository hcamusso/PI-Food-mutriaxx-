import React from 'react'
import styles from '../styles/landing.module.css';
import img from '../styles/images/cooking2.png'
import { Link } from 'react-router-dom'



export const LandingPage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to </h1>
        <h1 className={styles.title2}>CookBook</h1>
        <img className={styles.cookbook} src={img} alt="CookBook"></img>
        <p className={styles.subtitle}>What are we cooking today?</p>
        <Link to='/home'>
          <button className={styles.buttonStart}>Get started</button>
        </Link>
        <div className={styles.attribution}>
          Made with 💜 by <a href="https://github.com/mutriaxx">Marcela Utria</a>
        </div>
        
      </div>
    </div>
  )
}
