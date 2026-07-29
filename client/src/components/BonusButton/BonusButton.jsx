import React from 'react'
import styles from './BonusButton.module.scss'

export const BonusButton = ({ content }) => {
  return (
        <button className={styles.bonus}>
            {content}
        </button>
  )
}
