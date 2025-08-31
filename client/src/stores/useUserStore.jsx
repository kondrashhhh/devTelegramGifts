import { create } from 'zustand';

export const useUserStore = create(() => ({
  isAuthorized: false,
  userData: {},
  userInventory: [],
}));
