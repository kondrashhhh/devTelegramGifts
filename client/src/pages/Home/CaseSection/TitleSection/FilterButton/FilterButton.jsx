import React from 'react'
import cn from 'classnames'
import styles from './FilterButton.module.scss'

export const FilterButton = ({ active = false, onClick, children }) => {
  return (
    <button
      className={cn(styles.button, active && styles.active)}
      onClick={onClick}
    >
        {children}
    </button>
  )
}
