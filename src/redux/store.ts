import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './Auth/AuthSlice'
import { checkLoggedUser } from './Auth/AuthActions';
import ProductSlice from './products/ProductSlice';
import { getProducts } from './products/ProductActions';

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    product: ProductSlice,
  },
})

store.dispatch(checkLoggedUser());
store.dispatch(getProducts());

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch