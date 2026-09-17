import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set, get) => ({
      isAuthorized: true,
      userData: {"id":8502659199,"telegram_id":8502659199,"first_name":"adolf","last_name":"hitler","username":"dogofkdldl","photo_url":"https://t.me/i/userpic/320/7TBdCR9PBhHyCBOY2eVuGkaLcIdYwwrAfg6P0qsmAJqIW1SN6LjCXEZhQYISBag6.jpg","auth_date":1788989993,"hash":null,"balance":4678,"inventory":[],"created_at":"2026-09-07 22:45:04","updated_at":"2026-09-11 16:08:03"},
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

      setBalance: (balance) => {
        const nextBalance = Number(balance ?? 0);
        const nextUserData = {
          ...get().userData,
          balance: nextBalance,
        };

        set({
          balance: nextBalance,
          userData: nextUserData,
        });

        const storedAuth = localStorage.getItem('telegram_auth');
        if (storedAuth) {
          const authState = JSON.parse(storedAuth);
          localStorage.setItem('telegram_auth', JSON.stringify({
            ...authState,
            userData: nextUserData,
          }));
        }
      },

      AddInventoryItem: async (value) => {
        const telegramId = get().userData?.telegram_id || get().userData?.id;
        const response = await fetch('http://localhost:3000/api/auth/profile', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            telegram_id: telegramId,
            inventoryItem: value,
          }),
        });

        if (!response.ok) {
          throw new Error('Не удалось сохранить предмет в инвентарь');
        }

        set({ userInventory: [...get().userInventory, value] });
      },

      SellInventoryItem: async (uniqueId) => {
        const currentInventory = get().userInventory;
        const item = currentInventory.find((inventoryItem) => inventoryItem.uniqueId === uniqueId);
        const updatedInventory = currentInventory.filter(
          (item) => item.uniqueId !== uniqueId
        );
        const telegramId = get().userData?.telegram_id || get().userData?.id;
        const balance = Number(get().balance ?? 0) + Number(item?.price ?? 0);

        const response = await fetch('http://localhost:3000/api/auth/profile', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            telegram_id: telegramId,
            balance,
            inventory: updatedInventory,
          }),
        });

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result?.error || 'Не удалось продать предмет');
        }

        const nextBalance = Number(result.user?.balance ?? balance);
        const nextUserData = {
          ...get().userData,
          balance: nextBalance,
          inventory: updatedInventory,
        };

        set({
          userInventory: updatedInventory,
          balance: nextBalance,
          userData: nextUserData,
        });

        const storedAuth = localStorage.getItem('telegram_auth');
        if (storedAuth) {
          const authState = JSON.parse(storedAuth);
          localStorage.setItem('telegram_auth', JSON.stringify({
            ...authState,
            userData: nextUserData,
          }));
        }

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

export const useGetBalance = () =>
  useUserStore((state) => state.balance);

export const useUserAuth = () => useUserStore((state) => ({
  isAuthorized: state.isAuthorized,
  userData: state.userData,
  balance: state.balance,
  setUser: state.setUser,
  clearUser: state.clearUser,
  setUserState: state.setUserState,
}));

export const useSetBalance = () => useUserStore((state) => state.setBalance);

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