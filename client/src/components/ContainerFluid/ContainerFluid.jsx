import React from 'react'
import cn from 'classnames'
import styles from './ContainerFluid.module.scss'

export const ContainerFluid = ({ children, className }) => {
  return (
    <div className={cn(styles.container, className)}>
        {children}
    </div>
  )
}
