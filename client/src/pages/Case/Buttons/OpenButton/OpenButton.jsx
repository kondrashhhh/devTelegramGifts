import React from 'react'
import cn from 'classnames'
import { useCaseCount, useCaseDisabled, useCaseDoubleChance, useCaseOpen, useCasePrice } from '@/stores/useCaseStore'
import { useSetParams } from '@/stores/useNotificationStore'
import { Price } from '@/components/Price/Price'
import styles from "./OpenButton.module.scss"

export const OpenButton = ({ info, className }) => {
  const doubleChance = useCaseDoubleChance();
  const isDisabled = useCaseDisabled();
  const count = useCaseCount();
  const price = useCasePrice();
  const open = useCaseOpen();

  const setParams = useSetParams();

  const handleClick = () => {
    open(
      info.category,
      info.name,
      isDisabled,
      count
    )

    setParams('good', {
      title: `Кейс «${info.name}» успешно открыт`,
      message: `за ${price}`,
    })
  }

  return (
    <button
     onClick={handleClick}
     className={cn(styles.open, className)}
    >
        открыть
        <Price value={doubleChance ? price * 1.2 : price}/>
    </button>
  )
}

