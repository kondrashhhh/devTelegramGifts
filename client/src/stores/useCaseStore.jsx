import { create } from 'zustand';

export const useCaseStore = create((set) => ({
  isOpening: false,
  caseData: null,
  itemData: {},
  loading: true,
  doubleChance: false,
  count: 1,

  fetchCase: async (category, translit_name) => {
    set({ loading: true });
    try {
      const response = await fetch(
        `http://localhost:3000/api/cases/${category}/${translit_name}`,
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

  openCase: async (category, translit_name, isOpening) => {
    if (isOpening) return;
    try {
      const response = await fetch(
        `http://localhost:3000/api/cases/${category}/${translit_name}/open`,
        {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const itemData = await response.json();
      set({ itemData });
      set({ isOpening: true });
    } catch (error) {
      console.error('Ошибка открытия:', error);
    }
  },

  setDoubleChance: (value) => set({ doubleChance: value }),
  setOpening: (value) => set({ isOpening: value }),
  setCount: (value) => set({ count: value }),
}));

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