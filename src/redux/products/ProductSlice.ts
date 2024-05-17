import { createSlice } from '@reduxjs/toolkit';
import { getProducts } from './ProductActions';

const initialState = {
  loading: false,
  products: [],
  error: null
};

const productSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        const newState = { ...state };
        newState.loading = true;
        newState.error = null;
        return newState;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        const newState = { ...state };
        newState.loading = false;
        newState.products = payload;
        return newState;
      })
      .addCase(getProducts.rejected, (state, { payload }) => {
        const newState = { ...state };
        newState.loading = false;
        newState.error = (payload as { data: null }).data;
        return newState;
      });
  }
});

export default productSlice.reducer;
