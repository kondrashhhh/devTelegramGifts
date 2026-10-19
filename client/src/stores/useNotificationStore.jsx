
import { create } from 'zustand';

let nextId = 0;
const timers = new Map();

export const useNotificationStore = create((set, get) => ({
  notifications: [],

  addNotification: (id, content = {}) => {
    const notificationId = ++nextId;

    const notification = {
      id: notificationId,
      type: content.type || id,
      title: content.title || (
        id === 'good' ? 'Успешно' : 'Ошибка'
      ),
      message: content.message || '',
      duration: content.duration || 4000,
    };

    set((state) => ({
      notifications: [...state.notifications, notification],
    }));

    const timer = setTimeout(() => {
      get().removeNotification(notificationId);
    }, content.duration || 4000);

    timers.set(notificationId, timer);

    return notificationId;
  },

  removeNotification: (id) => {
    const timer = timers.get(id);

    if (timer) {
      clearTimeout(timer);
      timers.delete(id);
    }

    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id
      ),
    }));
  },
}));

export const useSetParams = () =>
  useNotificationStore((state) => state.addNotification);

export const useGetNotifications = () =>
  useNotificationStore((state) => state.notifications);

export const useRemoveNotification = () =>
  useNotificationStore((state) => state.removeNotification);
