import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/navBar.module.css';
import logo from '../styles/images/logo.png'


export const NavBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link className={styles.link} to='/home'><img className={styles.icon} src={logo} alt="" />
        <p>CookBook</p></Link>
      </div>
      <div className={styles.menu}>
        <Link to='/create'><li>Create Recipe</li></Link>
      </div>
        
    </div>
  )
}
