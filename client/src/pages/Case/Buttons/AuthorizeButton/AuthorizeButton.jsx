import React from 'react'
import cn from 'classnames'
import styles from './AuthorizeButton.module.scss';

export const AuthorizeButton = ({ className }) => {
  return (
    <button
     className={cn(styles.open, className)}
    >
        Авторизоваться
    </button>
  )
}
