import React from 'react'
import { Link } from 'react-router'
import styles from './Empty.module.scss'

export const Empty = () => {
  return (
    <div className={styles.empty}>
      <div className={styles.image}>
          <img src="/empty.png" alt="" />
      </div>
      <span className={styles.text}>У вас еще нет предметов</span>
      <span className={styles.darkText}>Откройте свой первый кейс, чтобы получить <br /> новые предметы</span>
      <Link to={'/'}>
        <button className={styles.button} >
          Перейти к кейсам
        </button>
      </Link>
    </div>
  )
}
