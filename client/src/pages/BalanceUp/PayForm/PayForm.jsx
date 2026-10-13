import React from 'react'
import styles from './PayForm.module.scss'
import { Input } from './Input/Input.jsx'
import { DepositButton } from './DepositButton/DepositButton'

export const PayForm = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <span>Заполните данные</span>
      </div>
      <div className={styles.container}>
        <Input
         placeholder="Введите сумму..."
         className={styles.deposit}
         onlyNumbers
        />
        <Input
         placeholder="Промокод (если есть)"
        />
      </div>
      <div className={styles.button}>
        <DepositButton />
      </div>
    </div>
  )
}
