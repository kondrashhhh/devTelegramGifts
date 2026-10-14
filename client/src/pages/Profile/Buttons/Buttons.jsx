import React from 'react'
import { HomeButton } from './HomeButton/HomeButton'
import { LogoutButton } from './LogoutButton/LogoutButton'
import styles from './Buttons.module.scss'

export const Buttons = () => {
  return (
    <div className={styles.container}>
        <HomeButton className={styles.button}/>
        <LogoutButton className={styles.button}/>
    </div>
  )
}
