import React from 'react'
import cn from 'classnames'
import { Flex } from '@/components/Flex/Flex'
import { OpenButton } from './OpenButton/OpenButton'
import { SkipButton } from './SkipButton/SkipButton'
import styles from "./Buttons.module.scss"
import { useCaseOpening } from '@/stores/useCaseStore'

export const Buttons = ({ info }) => {
  const isOpening = useCaseOpening();

  return (
    <Flex className={styles.gap}>
       <OpenButton
        info={info}
        className={cn(styles.button, isOpening && styles.disabled)}
        isOpening={isOpening}
       />
       <SkipButton className={cn(styles.button, isOpening && styles.disabled)} />
    </Flex>
  )
}
