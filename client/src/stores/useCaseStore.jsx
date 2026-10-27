import { create } from 'zustand';
import { useUserStore } from './useUserStore';

export const useCaseStore = create((set, get) => ({
  isOpening: false,
  showWinScreen: false,
  isDisabled: false,
  caseData: null,
  itemData: {},
  loading: true,
  doubleChance: false,
  count: 1,

  fetchCase: async (category, translit_name) => {
    set({ loading: true });
    try {
      const response = await fetch(
        `/api/cases/${category}/${translit_name}`, // http://localhost:3000/api/cases/${category}/${translit_name
        {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) throw new Error('Кейс не найден');
      
      const caseData = await response.json();
      set({ caseData, loading: false });
    } catch (error) {
      console.error('Ошибка загрузки:', error);
      set({ loading: false });
    }
  },

  openCase: async (category, translit_name, isDisabled, count, isSkipButton = false) => {
    if (isDisabled) return;

    const price = Number(get().caseData?.price ?? 0);
    const telegramId = useUserStore.getState().userData?.telegram_id
      || useUserStore.getState().userData?.id;

    const fetchBody = JSON.stringify({
      "count": count,
      "cost": price * Number(count || 1),
      "telegram_id": telegramId,
    })

    try {
      const response = await fetch(
        `/api/cases/${category}/${translit_name}/open`, // http://localhost:3000/api/cases/${category}/${translit_name}/open
        {
          method: "POST",
          credentials: 'include',
          body: fetchBody,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData?.error || 'Ошибка открытия кейса');

      const itemData = responseData.items;
      useUserStore.getState().setBalance(responseData.balance);

      Array.isArray(itemData) || isSkipButton
        ? set({ itemData, showWinScreen: true, isDisabled: true })
        : set({ itemData, isOpening: true, isDisabled: true })
        
      
    } catch (error) {
      console.error('Ошибка открытия:', error);
    }
  },


    sellItem: async (itemIndex) => {
      const state = get();
      const items = Array.isArray(state.itemData)
        ? state.itemData
        : [state.itemData];

      const item = items[itemIndex];
      if (!item) throw new Error('Предмет не найден');

      const userState = useUserStore.getState();
      const inventory = userState.userInventory || [];

      const updatedInventory = inventory.filter(
        (inventoryItem) => inventoryItem.uniqueId !== item.uniqueId
      );

      const balance =
        Number(userState.balance ?? 0) + Number(item.price ?? 0);

      const response = await fetch('/api/auth/profile', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          balance,
          inventory: updatedInventory,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || 'Не удалось продать предмет');
      }

      const savedUser = result.user;

      userState.setUserState({
        balance: savedUser.balance,
        inventory: savedUser.inventory,
        userData: savedUser,
      });

      const remainingItems = items.filter((_, index) => index !== itemIndex);

      if (remainingItems.length > 0) {
        set({ itemData: remainingItems });
      } else {
        set({ itemData: {} });
        get().setWinScreen(false);
      }
    },

    saveItem: async (itemIndex) => {
      const state = get();
      const items = Array.isArray(state.itemData)
        ? state.itemData
        : [state.itemData];

      const item = items[itemIndex];
      if (!item) throw new Error('Предмет не найден');

      const response = await fetch('/api/auth/profile', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inventoryItem: item,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || 'Не удалось сохранить предмет');
      }

      const savedUser = result.user;

      useUserStore.getState().setUserState({
        balance: savedUser.balance,
        inventory: savedUser.inventory,
        userData: savedUser,
      });

      const remainingItems = items.filter((_, index) => index !== itemIndex);

      if (remainingItems.length > 0) {
        set({ itemData: remainingItems });
      } else {
        set({ itemData: {} });
        get().setWinScreen(false);
      }
    },

    saveAllItems: async () => {
      const items = Array.isArray(get().itemData)
        ? [...get().itemData]
        : get().itemData && Object.keys(get().itemData).length > 0
          ? [get().itemData]
          : [];

      for (const item of items) {
        const response = await fetch('/api/auth/profile', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            inventoryItem: item,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result?.error || 'Не удалось сохранить все предметы');
        }

        const savedUser = result.user;

        useUserStore.getState().setUserState({
          balance: savedUser.balance,
          inventory: savedUser.inventory,
          userData: savedUser,
        });
      }

      set({
        itemData: {},
        showWinScreen: false,
        isDisabled: false,
      });
    },


  setDoubleChance: (value) => set({ doubleChance: value }),
  setOpening: (value) => set({ isOpening: value }),
  setCount: (value) => set({ count: value }),
  setWinScreen: (value) => set({ showWinScreen: value, isDisabled: value })
}));

export const useWinScreen = () => ({
  showWinScreen: useCaseStore((state) => state.showWinScreen),
  setWinScreen: useCaseStore((state) => state.setWinScreen)
});

export const useItemSell = () => 
  useCaseStore((state) => state.sellItem);

export const useItemSave = () => 
  useCaseStore((state) => state.saveItem);

export const useCaseSaveAll = () => 
  useCaseStore((state) => state.saveAllItems);

export const useCaseDisabled = () => 
  useCaseStore((state) => state.isDisabled);

export const useCaseOpen = () => 
  useCaseStore((state) => state.openCase);

export const useCaseOpening = () => 
  useCaseStore((state) => state.isOpening);

export const useCaseSetOpening = () => 
  useCaseStore((state) => state.setOpening);

export const useCasePrice = () => 
  useCaseStore((state) => state.caseData.price);

export const useCaseItems = () => 
  useCaseStore((state) => state.caseData.items);

export const useCaseWinItem = () => 
  useCaseStore((state) => state.itemData);

export const useCaseCount = () => 
  useCaseStore((state) => state.count);

export const useCaseSetCount = () => 
  useCaseStore((state) => state.setCount);

export const useCaseDoubleChance = () => 
  useCaseStore((state) => state.doubleChance);

export const useCaseSetDoubleChance = () => 
  useCaseStore((state) => state.setDoubleChance);
