import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set, get) => ({
      isAuthorized: false,
      userData: {},
      userInventory: [],

      AddInventoryItem: (value) => {
        set({ userInventory: [...get().userInventory, value] });
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useAddInventoryItem = () =>
  useUserStore((state) => state.AddInventoryItem);

export const useGetInventory = () => {
  return useUserStore((state) => state.userInventory);
};