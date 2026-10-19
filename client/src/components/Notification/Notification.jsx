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
            <svg width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z" fill="#FFFFFF"/>
                </g>
            </svg>
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
