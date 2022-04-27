import React from 'react'
import styles from '../styles/PageNotFound.module.css'
import error from '../styles/images/error.png'

export const PageNotFound = () => {
  return (
    <div className={styles.root}>
        <div className={styles.container}>
            <img className={styles.error} src={error} alt="error 404"/>
            <h1>Error 404</h1>
        </div>
            <p>Page not found</p>
        
    </div>
  )
}

export default PageNotFound