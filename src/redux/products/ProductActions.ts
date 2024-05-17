import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../config/constants';

export const getProducts = createAsyncThunk('products/all', async () => {
  let url = `${API_URL}/products/all`;
  const response = await axios.get(url);
  if (!response.data) {
    throw new Error('Network response is not correct');
  }
  return response.data;
});
