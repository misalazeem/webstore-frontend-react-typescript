import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  loadCartFromLocalStorage,
  clearCart,
} from './CartActions';
import { CartItem } from '../products/types';

export type CartState = {
  items: CartItem[];
  loading: boolean;
  error: string | null;
};

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, { payload }: PayloadAction<CartItem>) => {
        state.loading = false;
        const itemIndex = state.items.findIndex((item) => item._id === payload._id);
        if (itemIndex >= 0) {
          state.items[itemIndex].quantity = payload.quantity;
        } else {
          state.items.push(payload);
        }
        localStorage.setItem('cart', JSON.stringify(state.items));
      })
      .addCase(addToCart.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message || 'Failed to add item to cart';
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, { payload }: PayloadAction<string>) => {
        state.loading = false;
        state.items = state.items.filter((item) => item._id !== payload);
        localStorage.setItem('cart', JSON.stringify(state.items));
      })
      .addCase(removeFromCart.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message || 'Failed to remove item from cart';
      })
      .addCase(increaseQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(increaseQuantity.fulfilled, (state, { payload }: PayloadAction<string>) => {
        state.loading = false;
        const itemIndex = state.items.findIndex((item) => item._id === payload);
        if (itemIndex >= 0) {
          state.items[itemIndex].quantity += 1;
          localStorage.setItem('cart', JSON.stringify(state.items));
        }
      })
      .addCase(increaseQuantity.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message || 'Failed to increase item quantity';
      })
      .addCase(decreaseQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(decreaseQuantity.fulfilled, (state, { payload }: PayloadAction<string>) => {
        state.loading = false;
        const itemIndex = state.items.findIndex((item) => item._id === payload);
        if (itemIndex >= 0 && state.items[itemIndex].quantity > 1) {
          state.items[itemIndex].quantity -= 1;
          localStorage.setItem('cart', JSON.stringify(state.items));
        }
      })
      .addCase(decreaseQuantity.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message || 'Failed to decrease item quantity';
      })
      .addCase(loadCartFromLocalStorage.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadCartFromLocalStorage.fulfilled, (state, { payload }: PayloadAction<CartItem[]>) => {
        state.loading = false;
        state.items = payload;
      })
      .addCase(loadCartFromLocalStorage.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message || 'Failed to load cart from local storage';
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
        localStorage.removeItem('cart');
      });
  },
});

export default cartSlice.reducer;
