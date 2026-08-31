import React from 'react'
import styles from './SellButton.module.scss'

export const SellButton = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      Продать
    </button>
  )
}
