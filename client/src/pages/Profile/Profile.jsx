import React from 'react'
import { Typography } from '@/components/Typography/Typography'
import { AccountInfo } from './AccountInfo/AccountInfo'
import { Inventory } from './Inventory/Inventory'
import styles from './Profile.module.scss'

export const Profile = () => {
  return (
    <div className={styles.page}>
        <Typography tag="h2" variant="gothic">Мой профиль</Typography>
        <AccountInfo />
        <Inventory />
    </div>
  )
}
