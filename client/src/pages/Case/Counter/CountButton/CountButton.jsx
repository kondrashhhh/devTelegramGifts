import React from 'react'
import cn from 'classnames'
import styles from "./CountButton.module.scss"

export const CountButton = ({ isActive, onClick, number }) => {
  return (
    <button
     className={cn(styles.button, isActive && styles.active)}
     onClick={() => onClick(number)}
    >
        {number}
    </button>
  )
}
