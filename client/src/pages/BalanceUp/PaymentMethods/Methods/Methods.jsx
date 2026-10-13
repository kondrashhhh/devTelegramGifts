import React from 'react'
import styles from './Methods.module.scss'
import { Method } from './Method/Method'
import { usePaymentStore } from '@/stores/usePaymentStore'

const variants = [
  {
    value: 'visa_mastercard',
    icon: '/visa_mastercard.png',
  },
  {
    value: 'crypto',
    icon: '/visa_mastercard.png',
  },
  {
    value: 'bank_transfer',
    icon: '/visa_mastercard.png',
  },
  {  
    value: 'xmr',
    icon: '/visa_mastercard.png',
  },
]

export const Methods = () => {
  const selectedPaymentMethod = usePaymentStore(
    (state) => state.selectedPaymentMethod
  )

  const setPaymentMethod = usePaymentStore(
    (state) => state.setPaymentMethod
  )

  return (
    <div className={styles.wrapper}>
      {variants.map((el) => (
        <Method
          key={el.value}
          icon={el.icon}
          active={selectedPaymentMethod === el.value}
          onClick={() => setPaymentMethod(el.value)}
        />
      ))}
    </div>
  )
}