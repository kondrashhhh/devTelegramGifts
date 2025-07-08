import React from 'react'
import { Link } from 'react-router'
import styles from './BalanceButton.module.scss'

export default function BalanceButton() {
  return (
    <button className={`${styles.balance} button`}>
        <Link to="/">
          <img src="/header/balance.png" alt="" width={20} height={20}/>
          <span>0.00 ₽</span>
        </Link>
    </button>
  )
}
