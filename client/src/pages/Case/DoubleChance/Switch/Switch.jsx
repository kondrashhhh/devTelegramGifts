import React from 'react'
import { useCaseDoubleChance, useCaseOpening, useCaseSetDoubleChance } from '@/stores/useCaseStore';
import styles from "./Switch.module.scss"

export const Switch = () => {
  const doubleChance = useCaseDoubleChance();
  const isOpening = useCaseOpening();
  const setDoubleChance = useCaseSetDoubleChance();

  return (
    <label className={styles["checkbox-ios"]}>
      <input 
        type="checkbox" 
        onClick={() => !isOpening && setDoubleChance(!doubleChance)} 
        disabled={isOpening}
      />
      <span className={styles["checkbox-ios-switch"]}></span>
    </label>
  )
}
