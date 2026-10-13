import React from 'react'
import { Items } from './Items/Items.jsx'
import styles from './Info.module.scss'

export const Info = () => {
  return (
    <div className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.walletIcon}>
              <img src="/wallet-icon.svg" alt="" />
          </div>
          <span>Пополнение <br /> баланса</span>
        </div>
        <div className={styles.items}>
          <Items />
        </div>
    </div>
  )
}
