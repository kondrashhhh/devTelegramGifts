import React from 'react'
import styles from './Empty.module.scss'

export const Empty = () => {
  return (
    <div className={styles.empty}>
      <div className={styles.image}>
          <img src="/empty.png" alt="" />
      </div>
      <span className={styles.text}>У вас еще нет предметов</span>
      <span className={styles.darkText}>Откройте свой первый кейс, чтобы получить <br /> новые предметы</span>
      <button>Перейти к кейсам</button>
    </div>
  )
}
