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

      const items = Array.isArray(itemData) ? itemData : [itemData];
      for (const item of items) {
        const inventoryResponse = await fetch('/api/auth/profile', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            telegram_id: telegramId,
            inventoryItem: item,
          }),
        });

        if (!inventoryResponse.ok) {
          throw new Error('Не удалось сохранить предмет в инвентарь');
        }

        useUserStore.getState().AddInventoryItem(item);
      }

      Array.isArray(itemData) || isSkipButton
        ? set({ itemData, showWinScreen: true, isDisabled: true })
        : set({ itemData, isOpening: true, isDisabled: true })
        
      
    } catch (error) {
      console.error('Ошибка открытия:', error);
    }
  },

  sellItem: (itemIndex) => {
    const { itemData, setWinScreen } = get();
    
    if (Array.isArray(itemData) && itemData.length > 1) {
      const newItemData = [...itemData];
      newItemData.splice(itemIndex, 1);
      set({ itemData: newItemData });
    } else {
      setWinScreen(false);
    }
  },

  saveItem: (itemIndex) => {
    const { itemData, setWinScreen } = get();
    
    if (Array.isArray(itemData) && itemData.length > 1) {
      const newItemData = [...itemData];
      newItemData.splice(itemIndex, 1);
      set({ itemData: newItemData });
    } else {
      setWinScreen(false);
    }
  },

  saveAllItems: () => {
    const { itemData } = get();
    if (Array.isArray(itemData)) {
      itemData.forEach((_, index) => {
        get().saveItem(index); 
      });
    }
    set({ itemData: {} });
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
