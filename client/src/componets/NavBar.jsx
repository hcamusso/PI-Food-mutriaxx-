import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/navBar.module.css';
import logo from '../styles/images/logo.png'


export const NavBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img className={styles.icon} src={logo} alt="" />
        <p>CookBook</p>
      </div>
      <div className={styles.menu}>
        <Link to='/home'><li>Home</li></Link>
        <Link to='/create'><li>Create Recipe</li></Link>
      </div>
        
    </div>
  )
}
