import React from 'react'
import { ContainerFluid } from '@/components/ContainerFluid/ContainerFluid'
import { Item } from './Item/Item'
import styles from './Items.module.scss'

export const Items = ({ items }) => {
  return (
    <ContainerFluid className={styles.container}>
        {items.map((item) => (
            <Item item={item}/>
        ))}
    </ContainerFluid>
  )
}
