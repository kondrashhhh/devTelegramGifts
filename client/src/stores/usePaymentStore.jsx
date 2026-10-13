import { create } from 'zustand'

export const usePaymentStore = create((set) => ({
  selectedPaymentMethod: null,

  setPaymentMethod: (method) =>
    set({
      selectedPaymentMethod: method,
    }),
}))