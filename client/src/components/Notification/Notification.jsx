
import React from 'react';
import cn from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useGetNotifications,
  useRemoveNotification,
} from '@/stores/useNotificationStore';
import styles from './Notification.module.scss';

const DURATION = 4;

const toastVariants = {
  hidden: {
    opacity: 0,
    x: 30,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 380,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

export const Notification = () => {
  const notifications = useGetNotifications();

  return (
    <div className={styles.wrapper}>
      <AnimatePresence initial={false}>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            layout
            className={cn(
              styles.toast,
              notification.type && styles[notification.type],
              notification.id && styles[notification.id],
            )}
            variants={toastVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.icon}>
              <svg width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <g>
                      <path fill="none" d="M0 0h24v24H0z"/>
                      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z" fill="#FFFFFF"/>
                  </g>
              </svg>
            </div>

            <div className={styles.content}>
              <div className={styles.title}>
                {notification.title}
              </div>
              <div className={styles.message}>
                {notification.message}
              </div>
            </div>

            <div className={styles.progress}>
              <motion.div
                className={styles.progressBar}
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{
                  duration: (notification.duration || 4000) / 1000,
                  ease: 'linear',
                }}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
