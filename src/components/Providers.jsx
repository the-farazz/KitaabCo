'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { hydrateCart } from '@/store/cartSlice';
import { hydrateWishlist } from '@/store/wishlistSlice';

function StoreHydrator({ children }) {
  useEffect(() => {
    store.dispatch(hydrateCart());
    store.dispatch(hydrateWishlist());
  }, []);
  return children;
}

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <StoreHydrator>
        {children}
      </StoreHydrator>
      <Toaster position="bottom-right" />
    </Provider>
  );
}
