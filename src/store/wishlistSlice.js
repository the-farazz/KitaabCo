import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    _hydrated: false,
  },
  reducers: {
    hydrateWishlist: (state) => {
      if (typeof window !== 'undefined' && !state._hydrated) {
        const savedWishlist = localStorage.getItem('kitaabco_wishlist');
        if (savedWishlist) {
          state.items = JSON.parse(savedWishlist);
        }
        state._hydrated = true;
      }
    },
    addToWishlist: (state, action) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        if (typeof window !== 'undefined') {
          localStorage.setItem('kitaabco_wishlist', JSON.stringify(state.items));
        }
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('kitaabco_wishlist', JSON.stringify(state.items));
      }
    },
    clearWishlist: (state) => {
      state.items = [];
      if (typeof window !== 'undefined') {
        localStorage.removeItem('kitaabco_wishlist');
      }
    },
    toggleWishlist: (state, action) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('kitaabco_wishlist', JSON.stringify(state.items));
      }
    },
  },
});

export const { hydrateWishlist, addToWishlist, removeFromWishlist, clearWishlist, toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
