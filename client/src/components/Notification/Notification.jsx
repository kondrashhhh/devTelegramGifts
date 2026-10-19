import React from 'react'
import cn from 'classnames'
import { useGetParams } from '@/stores/useNotificationStore'
import { useGetContent } from '@/stores/useNotificationStore'
import styles from './Notification.module.scss'

export const Notification = () => {
  const { notificationId, isShow } = useGetParams();
  const { type, message, title } = useGetContent();

  return (
    <div className={cn(
        styles.wrapper,
        type && styles[type],
        isShow && styles.show,
        notificationId && styles[notificationId],
    )}>
        <div className={styles.toast}>
          <div className={styles.icon}>✓</div>

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
