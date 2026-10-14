import React from 'react'
import { Link } from 'react-router'
import cn from 'classnames'
import styles from './HomeButton.module.scss'

export const HomeButton = ({ className }) => {
  return (
    <Link
     className={cn(styles.home, className)}
     to="/"
    >
        На главную
    </Link>
  )
}
