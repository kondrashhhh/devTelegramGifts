import React from 'react'
import cn from 'classnames'
import { Flex } from '@/components/Flex/Flex'
import { OpenButton } from './OpenButton/OpenButton'
import { SkipButton } from './SkipButton/SkipButton'
import styles from "./Buttons.module.scss"
import { useCaseDisabled } from '@/stores/useCaseStore'

export const Buttons = ({ info }) => {
  const isDisabled = useCaseDisabled();

  return (
    <Flex className={styles.gap}>
       <OpenButton
        info={info}
        className={cn(styles.button, isDisabled && styles.disabled)}
        isOpening={isDisabled}
       />
       <SkipButton className={cn(styles.button, isDisabled && styles.disabled)} />
    </Flex>
  )
}
