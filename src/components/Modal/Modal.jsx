import React, { useEffect } from 'react'
import styles from './Modal.module.css'


function Modal({largeImageURL, onClose}) {
useEffect(() => {
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
}, [onClose]);

const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
};

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
        <div className={styles.modal}>
            <img src={largeImageURL} alt=""/>
        </div>
    </div>
  )
}

export default Modal