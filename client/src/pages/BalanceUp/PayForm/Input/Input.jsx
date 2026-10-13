import React from 'react'
import { useGetCurrency } from '@/stores/useCurrencyStore'
import cn from 'classnames'
import styles from './Input.module.scss'

export const Input = ({ placeholder, ref, onChange, className, onlyNumbers }) => {
  const { currency } = useGetCurrency();

  const handleChange = (event) => {
    if (onlyNumbers) {
      event.target.value = event.target.value.replace(/\D/g, '')
    }

    if (onChange) {
      onChange(event)
    }
  }
  return (
    <div className={cn(styles.inputWrapper,
                       styles[currency],
                       onlyNumbers && styles.deposit)}>
        <input
         ref={ref}
         type="text"
         placeholder={placeholder}
         onChange={handleChange}
         className={cn(styles.input,
                      className ? className : undefined)}
        />
    </div>
  )
}
