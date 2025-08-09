import { create } from 'zustand';
import Ruble from "./currencies/ruble.svg";
import Star from "./currencies/star.svg";
import Ton from "./currencies/ton.svg";

export const useGlobalStore = create((set, get) => ({
  isAuthorized: false,
  userData: {},
  currency: "RUB",
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

export const useGlobalGetCurrency = () => {
  return {
    currency: useGlobalStore((state) => state.currency),
    calculate: useGlobalStore((state) => state.calculate),
    updateTonRate: useGlobalStore((state) => state.updateTonRate)
  };
};

export const useGlobalSetCurrency = () =>
  useGlobalStore((state) => state.setCurrency);