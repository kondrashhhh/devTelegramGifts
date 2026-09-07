import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set, get) => ({
      isAuthorized: false,
      userData: {},
      userInventory: [],
      balance: 0,

      setUser: (user) => {
        const normalizedUser = typeof user === 'string' ? JSON.parse(user) : (user || {});

        set({
          isAuthorized: true,
          userData: normalizedUser,
          userInventory: Array.isArray(normalizedUser.inventory) ? normalizedUser.inventory : get().userInventory,
          balance: Number(normalizedUser.balance ?? get().balance ?? 0),
        });
      },

      clearUser: () => {
        set({
          isAuthorized: false,
          userData: {},
          userInventory: [],
          balance: 0,
        });
      },

      setUserState: ({ balance, inventory, userData }) => {
        set({
          balance: Number(balance ?? get().balance ?? 0),
          userInventory: Array.isArray(inventory) ? inventory : get().userInventory,
          userData: userData || get().userData || {},
          isAuthorized: true,
        });
      },

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

export const useUserAuth = () => useUserStore((state) => ({
  isAuthorized: state.isAuthorized,
  userData: state.userData,
  balance: state.balance,
  setUser: state.setUser,
  clearUser: state.clearUser,
  setUserState: state.setUserState,
}));

export const refreshUserFromServer = async () => {
  try {
    const response = await fetch(`${window.location.origin}/api/auth/me`, { credentials: 'include' });
    const result = await response.json();

    if (!response.ok || !result?.user) {
      return null;
    }

    useUserStore.getState().setUser(result.user);
    return result.user;
  } catch (error) {
    console.error('Failed to refresh user from server:', error);
    return null;
  }
};