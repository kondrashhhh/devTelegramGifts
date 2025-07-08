import React from 'react'
import styles from './AccountInfo.module.scss'
import Avatar from './Avatar/Avatar'
import BalanceButton from './BalanceButton/BalanceButton'

export default function AccountInfo() {
  return (
    <div className={styles.wrapper}>
        <BalanceButton />
        <Avatar />
    </div>
  )
}
