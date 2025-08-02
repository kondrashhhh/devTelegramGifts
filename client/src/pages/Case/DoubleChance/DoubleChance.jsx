import React from 'react'
import cn from 'classnames'
import Boost from "./boost.svg"
import { useCaseOpening, useCasePrice } from '@/stores/useCaseStore'
import { Flex } from '@/components/Flex/Flex'
import { Price } from '@/components/Price/Price'
import { Switch } from './Switch/Switch'
import { Typography } from '@/components/Typography/Typography'
import { Instruction } from './Instruction/Instruction'
import styles from "./DoubleChance.module.scss"

export const DoubleChance = () => {
  const price = useCasePrice();
  const isOpening = useCaseOpening();
  return (
    <Flex className={cn(styles.gap, isOpening ? styles.disabled : "")}>
        <Boost />
        <Typography tag="span" className={styles.text}>X2 шанс</Typography>
        <Price value={price * 1.2}/>
        <Switch />
        <Instruction />
    </Flex>
  )
}
