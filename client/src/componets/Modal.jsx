import React from 'react'
import styles from '../styles/Modal.module.css'

export const Modal = ({children, state, setState}) => {
  return (
    <>
    {state && 
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.title}>
                    <h3>Successful Creation</h3>
                </div>
                {children}
            </div>
        </div>
    }
    </>
  )
}

export default Modal
