import { create } from 'zustand';

export const useNotificationStore = create((set, get) => ({
  isShow: false,
  notificationId: "",

  updateParams: (id) => {
    if (hideTimer) clearTimeout(hideTimer);

    set({ notificationId: id, isShow: true });

    hideTimer = setTimeout(() => {
      set({ isShow: false });
      hideTimer = null;
    }, 2000);
  },

  getParams: () => get().notificationId,
}));

export const useSetParams = () => 
    useNotificationStore((state) => state.updateParams)

export const useGetParams = () => {
  const notificationId = useNotificationStore((s) => s.notificationId);
  const isShow = useNotificationStore((s) => s.isShow);
  return { notificationId, isShow };
};
