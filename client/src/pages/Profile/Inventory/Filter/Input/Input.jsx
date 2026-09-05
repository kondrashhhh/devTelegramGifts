import React from 'react'
import { useGetCurrency } from '@/stores/useCurrencyStore'
import cn from 'classnames'
import styles from './Input.module.scss'

export const Input = ({ placeholder, ref, onChange, className }) => {
  const { currency } = useGetCurrency();
  return (
    <div className={cn(styles.inputWrapper, styles[currency])}>
        <input
         ref={ref}
         type="text"
         placeholder={placeholder}
         onChange={onChange}
         className={cn(styles.input,
                      className ? className : undefined)}
        />
    </div>
  )
}
