import React from 'react'
import styles from './OutputButton.module.scss'

export const OutputButton = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      Вывести
    </button>
  )
}
