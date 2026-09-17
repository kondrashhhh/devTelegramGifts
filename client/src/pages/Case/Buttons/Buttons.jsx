import React from 'react'
import cn from 'classnames'
import { Flex } from '@/components/Flex/Flex'
import { OpenButton } from './OpenButton/OpenButton'
import { EmptyBalanceButton } from './EmptyBalanceButton/EmptyBalanceButton'
import { useGetBalance } from '@/stores/useUserStore'
import { SkipButton } from './SkipButton/SkipButton'
import styles from "./Buttons.module.scss"
import { useCaseDisabled } from '@/stores/useCaseStore'

export const Buttons = ({ info }) => {
  const isDisabled = useCaseDisabled();
  const balance = useGetBalance();

  return (
    <Flex className={styles.gap}>
       {balance ? (
          <OpenButton
            info={info}
            className={cn(styles.button, isDisabled && styles.disabled)}
            isOpening={isDisabled}
          />
       )        : (
          <EmptyBalanceButton             
            info={info}
            className={cn(styles.button, isDisabled && styles.disabled)}
            isOpening={isDisabled}
          />
       )}
       
       <SkipButton
        info={info}
        className={cn(styles.button, isDisabled && styles.disable, !balance && styles.disabled)}
        isOpening={isDisabled}
       />
    </Flex>
  )
}
