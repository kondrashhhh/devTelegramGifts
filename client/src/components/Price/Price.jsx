import React from 'react'
import cn from 'classnames'
import styles from "./Price.module.scss"
import { useCaseDisabled } from '@/stores/useCaseStore'
import { useGlobalGetCurrency } from '@/stores/useGlobalStore'

export const Price = ({ value, disabled = true }) => {
  const { currency, calculate } = useGlobalGetCurrency();

  const isDisabled = useCaseDisabled()
  const disable = disabled ? isDisabled : disabled;
  return (
    <div className={cn(styles.priceBlock, disable && styles.disabled, styles[currency])}>
        <span className={styles.price}>{calculate(currency, false, value)}</span>
    </div>
  )
}
