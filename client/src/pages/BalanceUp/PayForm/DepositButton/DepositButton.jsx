import React from 'react'
import styles from './DepositButton.module.scss'

export const DepositButton = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      Пополнить баланс
    </button>
  )
}
