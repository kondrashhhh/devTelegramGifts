import React from 'react'
import cn from 'classnames'
import styles from './Method.module.scss'

export const Method = ({ icon, active, onClick }) => {
  return (
    <div
     className={cn(styles.wrapper, active && styles.active)}
     onClick={onClick}
    >
        <img src={icon} alt={`payment_method`} />
    </div>
  )
}
