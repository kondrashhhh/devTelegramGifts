import React from 'react'
import { Link } from 'react-router'
import styles from './Logo.module.scss'

export default function Logo() {
  return (
    <div className={styles.logo}>
        <Link to="/">
            <img
             className={styles.image}
             src="/header/logo.svg"
             alt=""
             width={130}
             height={28}
            />
        </Link>
    </div>
  )
}
