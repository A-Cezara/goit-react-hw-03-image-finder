import React from 'react'
import styles from './Button.module.css'


function Button({onClick}) {
  return (
    <button className={styles.loadMoreButton} onClick={onClick}>Load More</button>
  )
}

export default Button