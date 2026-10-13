import React from 'react'
import styles from './AuthorizeButton.module.scss';

export const AuthorizeButton = () => {
  return (
    <button
     className={cn(styles.open, className)}
    >
        Авторизоваться
    </button>
  )
}
