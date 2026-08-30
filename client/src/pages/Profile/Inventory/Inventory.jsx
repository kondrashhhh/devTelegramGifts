import React, { useEffect } from 'react'
import styles from './Inventory.module.scss'
import { Items } from './Items/Items'
import { Empty } from './Empty/Empty'
import { useGetInventory } from '@/stores/useUserStore'
import tabs from './tabs'

export const Inventory = () => {
  const userInventory = useGetInventory();

  useEffect(() => {
    console.log("Инвентарь: ", userInventory)
  }, [])
  return (
    <div className={styles.wrapper}>
        <div className={styles.tabs}>
        {tabs.map((tab, index) => (
            <div key={index} className={styles.tab}>
                <img src={tab.icon} alt={tab.label} />
                <span>{tab.label}</span>
            </div>
        ))}
        </div>
        <div className={styles.inventory}>
            {userInventory.length ? (<Items items={userInventory}/>) : (<Empty />)}
        </div>
    </div>
  )
}
