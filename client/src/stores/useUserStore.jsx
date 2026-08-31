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

      SellInventoryItem: (uniqueId) => {
        const currentInventory = get().userInventory;
        const updatedInventory = currentInventory.filter(
          (item) => item.uniqueId !== uniqueId
        );

        set({ userInventory: updatedInventory });
        
        return true;
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

export const useSellInventoryItem = () =>
  useUserStore((state) => state.SellInventoryItem);

export const useGetInventory = () => {
  return useUserStore((state) => state.userInventory);
};