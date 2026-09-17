import React from 'react'
import styles from './Info.module.scss'

export const Info = () => {
  return (
    <div className={styles.wrapper}>
        <div className={styles.walletIcon}>
            <img src="/wallet-icon.svg" alt="" />
        </div>
    </div>
  )
}
