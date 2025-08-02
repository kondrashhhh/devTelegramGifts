import React from 'react'
import cn from 'classnames'
import { useCaseDoubleChance, useCaseOpen, useCaseOpening, useCasePrice } from '@/stores/useCaseStore'
import { Price } from '@/components/Price/Price'
import styles from "./OpenButton.module.scss"

export const OpenButton = ({ info, className }) => {
  const doubleChance = useCaseDoubleChance();
  const isOpening = useCaseOpening();
  const price = useCasePrice();
  const open = useCaseOpen();

  return (
    <button
     onClick={() => open(info.category, info.name, isOpening)}
     className={cn(styles.open, className)}
    >
        открыть
        <Price value={doubleChance ? price * 1.2 : price}/>
    </button>
  )
}

