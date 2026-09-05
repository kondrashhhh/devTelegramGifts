import React from 'react'
import styles from './SellButton.module.scss'

export const SellButton = () => {
  return (
    <div className={styles.wrapper}>
        <button className={styles.button}>
            Продать всё
        </button>
    </div>
  )
}
