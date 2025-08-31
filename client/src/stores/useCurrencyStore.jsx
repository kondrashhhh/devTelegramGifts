import { create } from 'zustand';

export const useCurrencyStore = create((set, get) => ({
  currency: "STR",
  balanceRub: 1000,
  currentTonRate: 1000,

  updateTonRate: async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/the-open-network/');
      const data = await response.json();
      set({ currentTonRate: data.market_data.current_price.rub });
    } catch (error) {
      console.error("Failed to fetch TON rate:", error);
    }
  },

  calculate: (value, isBalance = false, price = 0) => {
    const { balanceRub, currentTonRate } = get();
    const defaultValue = isBalance ? balanceRub : price;

    const calculateResult = {
      RUB: defaultValue,
      STR: defaultValue / 1.8,
      TON: defaultValue / currentTonRate,
    }[value] || balanceRub;

    return parseFloat(calculateResult.toFixed(2));
  },

  setCurrency: (value) => {
    set({ currency: value });
  },
}));

export const useGetCurrency = () => {
  return {
    currency: useCurrencyStore((state) => state.currency),
    calculate: useCurrencyStore((state) => state.calculate),
    updateTonRate: useCurrencyStore((state) => state.updateTonRate)
  };
};

export const useSetCurrency = () =>
  useCurrencyStore((state) => state.setCurrency);