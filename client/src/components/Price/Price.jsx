import React from 'react'
import cn from 'classnames'
import styles from "./Price.module.scss"
import { useCaseDisabled } from '@/stores/useCaseStore'
import { useGetCurrency } from '@/stores/useCurrencyStore'

export const Price = ({ value, disabled = true, isItem = false }) => {
  const { currency, calculate } = useGetCurrency();
  const isDisabled = useCaseDisabled()
  const disable = disabled ? isDisabled : disabled;

  return (
    <div className={cn(
      styles.priceBlock,
      (disable && !isItem) && styles.disabled,
      isItem && styles.itemPrice,
      styles[currency],
    )}>
      <span className={styles.price}>{calculate(currency, false, value)}</span>
    </div>
  )
}