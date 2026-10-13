import React from 'react'
import { Methods } from './Methods/Methods'
import styles from './PaymentMethods.module.scss'

export const PaymentMethods = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <span>Выберите способ оплаты</span>
        <Methods />
      </div>
    </div>
  )
}
