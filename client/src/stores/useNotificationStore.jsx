import { create } from 'zustand';

let hideTimer = null;

export const useNotificationStore = create((set, get) => ({
  isShow: false,
  notificationId: '',
  type: "",
  message: "",
  title: "",

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

export const useGetContent = () => {
  const type = useNotificationStore((s) => s.type);
  const message = useNotificationStore((s) => s.message);
  const title = useNotificationStore((s) => s.title);
  return { type, message, title };
};
