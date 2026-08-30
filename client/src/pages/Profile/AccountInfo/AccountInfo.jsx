import React from 'react'
import Avatar from '@/layouts/MainLayout/Header/AccountInfo/Avatar/Avatar'
import { BonusButton } from '@/components/BonusButton/BonusButton'
import { Flex } from '@/components/Flex/Flex'
import { useMediaQuery } from 'react-responsive'
import styles from './AccountInfo.module.scss'

export const AccountInfo = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 680px)` })
  const isTab = useMediaQuery({ query: `(max-width: 1024px)` })

  return (
    <div className={styles.box}>
        { isMobile && <Avatar className={styles.avatar}/>}
        { isTab && !isMobile && <Avatar className={styles.avatar}/>}
        <div className={styles.infoItem}>
            <span>ЕЖЕДНЕВНЫЙ <br />БОНУС</span>
            <BonusButton content="Получить"/>
        </div>
        { !isTab && <Avatar className={styles.avatar}/>}
        <div className={`${styles.infoItem} ${styles.infoItemDark}`}>
            <span>ДЕПОЗИТОВ ЗА  <br /> ВСЕ ВРЕМЯ</span>
            <span>100 000</span>
        </div>
    </div>
  )
}
