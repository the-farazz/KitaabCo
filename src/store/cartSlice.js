import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    _hydrated: false,
  },
  reducers: {
    hydrateCart: (state) => {
      if (typeof window !== 'undefined' && !state._hydrated) {
        const savedCart = localStorage.getItem('kitaabco_cart');
        if (savedCart) {
          state.items = JSON.parse(savedCart);
        }
        state._hydrated = true;
      }
    },
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('kitaabco_cart', JSON.stringify(state.items));
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('kitaabco_cart', JSON.stringify(state.items));
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('kitaabco_cart', JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];
      if (typeof window !== 'undefined') {
        localStorage.removeItem('kitaabco_cart');
      }
    },
  },
});

export const { hydrateCart, addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
