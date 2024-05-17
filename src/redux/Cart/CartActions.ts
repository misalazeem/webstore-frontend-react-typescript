import { createAsyncThunk } from '@reduxjs/toolkit';
import { CartItem, Product } from '../products/types';
import { RootState } from '../store';

export const addToCart = createAsyncThunk<CartItem, Product, { state: RootState }>(
  'cart/addToCart',
  async (product, { getState }) => {
    const state = getState();
    const existingProduct = state.cart.items.find((item) => item._id === product._id);

    if (existingProduct) {
      return { ...existingProduct, quantity: existingProduct.quantity + 1 };
    } else {
      return { ...product, quantity: 1, _id: product._id };
    }
  }
);

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId: string) => {
  return productId;
});

export const increaseQuantity = createAsyncThunk(
  'cart/increaseQuantity',
  async (productId: string) => {
    return productId;
  }
);

export const decreaseQuantity = createAsyncThunk(
  'cart/decreaseQuantity',
  async (productId: string) => {
    return productId;
  }
);

export const loadCartFromLocalStorage = createAsyncThunk(
  'cart/loadCartFromLocalStorage',
  async () => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }
);

export const clearCart = createAsyncThunk('cart/clearCart', async () => {
  return [];
});
