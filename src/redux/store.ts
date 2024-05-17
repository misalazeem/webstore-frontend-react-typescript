import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './Auth/AuthSlice'
import { checkLoggedUser } from './Auth/AuthActions';
import ProductSlice from './products/ProductSlice';
import { getProducts } from './products/ProductActions';
import CartSlice from './Cart/CartSlice';
import { loadCartFromLocalStorage } from './Cart/CartActions';

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    product: ProductSlice,
    cart: CartSlice,
  },
})

store.dispatch(checkLoggedUser());
store.dispatch(getProducts());
store.dispatch(loadCartFromLocalStorage());

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch