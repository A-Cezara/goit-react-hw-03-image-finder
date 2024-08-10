import React from 'react'
import styles from './ImageGalleryItem.module.css'

function ImageGalleryItem({image, onClick}) {
  return (
    <li className={styles.galleryItem}>
        <img src={image.webformatURL}
        alt={image.tags}
        className={styles.image}
        onClick={onClick}>
        </img>
    </li>
  )
}

export default ImageGalleryItem