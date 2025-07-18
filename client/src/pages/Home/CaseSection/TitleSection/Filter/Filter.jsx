import React, { useEffect } from 'react'
import { useFilter } from '@/context/FilterContext'
import { FilterButton } from '../FilterButton/FilterButton'
import { Flex } from '@/components/Flex/Flex'
import styles from './Filter.module.scss'

export const Filter = ({ items = [] }) => {
  const { activeFilter, changeFilter } = useFilter();

  useEffect(() => {
    console.log("Фильтрационные элементы: ", items);
  })

  return (
    <Flex className={styles.gap}>
      {items && (
        <FilterButton
            id="all"
            active={activeFilter === "all"}
            onClick={() => changeFilter("all")}
        >
            Все
        </FilterButton>
      )}
      {items && items.map((item, index) => (
        <FilterButton
         key={index + 1}
         id={item.id}
         active={activeFilter === item.id}
         onClick={() => changeFilter(item.id)}
        >
            {item.name}
        </FilterButton>
      ))}
    </Flex>
  )
}