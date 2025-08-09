import React from 'react'
import { useCaseDisabled, useCaseDoubleChance, useCaseSetDoubleChance } from '@/stores/useCaseStore';
import styles from "./Switch.module.scss"

export const Switch = () => {
  const doubleChance = useCaseDoubleChance();
  const isDisabled = useCaseDisabled();
  const setDoubleChance = useCaseSetDoubleChance();

  return (
    <label className={styles["checkbox-ios"]}>
      <input 
        type="checkbox" 
        onClick={() => !isDisabled && setDoubleChance(!doubleChance)} 
        disabled={isDisabled}
      />
      <span className={styles["checkbox-ios-switch"]}></span>
    </label>
  )
}
