import React from 'react'
import styles from "./WinScreen.module.scss"

export const WinScreen = ({ item }) => {
  return (
    <div className={styles}>{item}</div>
  )
}
