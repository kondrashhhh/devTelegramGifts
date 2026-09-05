import React, { useRef } from 'react'
import { Input } from './Input/Input'
import { SellButton } from './SellButton/SellButton'
import styles from './Filter.module.scss'

export const Filter = () => {
  const fromInput = useRef();
  const toInput = useRef();
  return (
    <div className={styles.filterWrapper}>
      <div className={styles.filter}>
        <Input ref={fromInput} placeholder="От" />
        <Input ref={toInput} placeholder="До"/>
      </div>
      <SellButton />
    </div>
  )
}
