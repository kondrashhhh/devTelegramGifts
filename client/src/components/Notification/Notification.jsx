import React from 'react'
import cn from 'classnames'
import { useGetParams } from '@/stores/useNotificationStore'
import styles from './Notification.module.scss'

export const Notification = () => {
  const { notificationId, isShow } = useGetParams();

  return (
    <div className={cn(
        styles.wrapper,
        notificationId && styles[notificationId],
        isShow && styles.show,
    )}>
        Notification
    </div>
  )
}
