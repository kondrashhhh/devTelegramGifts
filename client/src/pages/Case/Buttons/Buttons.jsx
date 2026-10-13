import React, { useContext } from 'react'
import cn from 'classnames'
import { Flex } from '@/components/Flex/Flex'
import { OpenButton } from './OpenButton/OpenButton'
import { EmptyBalanceButton } from './EmptyBalanceButton/EmptyBalanceButton'
import { useGetBalance } from '@/stores/useUserStore'
import { SkipButton } from './SkipButton/SkipButton'
import styles from "./Buttons.module.scss"
import { useCaseDisabled } from '@/stores/useCaseStore'
import { AuthContext } from '@/context/AuthContext'
import { AuthorizeButton } from './AuthorizeButton/AuthorizeButton'

export const Buttons = ({ info }) => {
  const { userData } = useContext(AuthContext);
  const isDisabled = useCaseDisabled();
  const balance = useGetBalance();

  return (
    <Flex className={styles.gap}>
    {userData
      ? (balance ? (
          <OpenButton
            info={info}
            className={cn(styles.button, isDisabled && styles.disabled)}
            isOpening={isDisabled}
          />
        ) : (
          <EmptyBalanceButton
            info={info}
            className={cn(styles.button, isDisabled && styles.disabled)}
            isOpening={isDisabled}
          />
        ))
      : (
        <AuthorizeButton 
         className={cn(styles.button)}
        />
      )}
      { userData && balance > 0 && (
       <SkipButton
        info={info}
        className={cn(styles.button, isDisabled && styles.disable, !balance && styles.disabled)}
        isOpening={isDisabled}
       />
      )}
    </Flex>
  )
}
