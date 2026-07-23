import React, { useEffect } from 'react'
import { useCaseItems } from '@/stores/useCaseStore'
import { ContainerFluid } from '@/components/ContainerFluid/ContainerFluid'
import { Item } from './Item/Item'

import styles from './ItemList.module.scss'

export const ItemList = () => {
  const items = useCaseItems();
  useEffect(() => {
    console.log("Массив предметов для низа страницы: ", items)
  }, [])

  return (
    <ContainerFluid className={styles.container}>
        {items.map((item) => (
            <Item item={item}/>
        ))}
    </ContainerFluid>
  )
}
