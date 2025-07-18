import React from 'react'
import { Filter } from './Filter/Filter'
import styles from './TitleSection.module.scss'

export const TitleSection = ({ children, items = [] }) => {
  return (
    <div className={styles.titleWrapper}>
        <div className={styles.category}>
            В тренде
        </div>
        <div className={styles.secondContainer}>
            <div className={styles.title}>{children}</div>
            <Filter items={items}/>
        </div>
    </div>
  )
}
