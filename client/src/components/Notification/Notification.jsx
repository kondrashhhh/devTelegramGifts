import React from 'react'
import cn from 'classnames'
import { useGetParams } from '@/stores/useNotificationStore'
import { useGetContent } from '@/stores/useNotificationStore'
import styles from './Notification.module.scss'

import Logo from './notification.svg?react'

export const Notification = () => {
  const { notificationId, isShow } = useGetParams();
  const { type, message, title } = useGetContent();

  return (
    <div className={cn(
        styles.wrapper,
        isShow && styles.show,
    )}>
        <div className={cn(
          styles.toast,
          type && styles[type],
          notificationId && styles[notificationId],
        )}>
          <div className={styles.icon}>
            <Logo />
          </div>

          <div className={styles.content}>
            <div className={styles.title}>{title}</div>
            <div className={styles.message}>
              {message}
            </div>
          </div>

          <div className={styles.progress}>
            <div className={styles.progressBar}></div>
          </div>
        </div>
    </div>
  )
}
