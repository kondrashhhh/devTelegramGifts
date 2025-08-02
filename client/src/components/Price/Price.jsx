import React from 'react'
import cn from 'classnames'
import styles from "./Price.module.scss"
import { useCaseOpening } from '@/stores/useCaseStore'

export const Price = ({ value }) => {
  const isOpening = useCaseOpening();
  return (
    <div className={cn(styles.priceBlock, isOpening && styles.disabled)}>
        <span className={styles.price}>{Math.round(value)}</span>
    </div>
  )
}
