import React, { useEffect } from 'react'
import cn from 'classnames'
import styles from './LogoutButton.module.scss'

export const LogoutButton = ({ className }) => {

  return (
    <button
     className={cn(styles.logout, className)}
     onClick={() => localStorage.clear()}
    >
        Выйти из профиля
    </button>
  )
}
