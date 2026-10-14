import React, { useContext, useEffect } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { Typography } from '@/components/Typography/Typography'
import { AccountInfo } from './AccountInfo/AccountInfo'
import { Buttons } from './Buttons/Buttons'
import { Inventory } from './Inventory/Inventory'
import styles from './Profile.module.scss'

export const Profile = () => {
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    if (!userData)
      return <h1>Не авторизован</h1>
  }, [])

  return (
    <div className={styles.page}>
        <Typography tag="h2" variant="gothic">Мой профиль</Typography>
        <AccountInfo />
        <Buttons />
        <Inventory />
    </div>
  )
}