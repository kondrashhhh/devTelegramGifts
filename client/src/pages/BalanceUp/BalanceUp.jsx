import React from 'react'
import { Typography } from '@/components/Typography/Typography'
import { Info } from './Info/Info'
import { PaymentMethods } from './PaymentMethods/PaymentMethods'
import { PayForm } from './PayForm/PayForm'
import styles from './BalanceUp.module.scss'

export const BalanceUp = () => {
  return (
    <div className={styles.page}>
        <Typography tag="h2" variant="gothic">Пополнение баланса</Typography>

        <div className={styles.container}>
            <Info />
            <div className={styles.rightColumn}>
              <PaymentMethods />
              <PayForm />
            </div>
        </div>
    </div>
  )
}
