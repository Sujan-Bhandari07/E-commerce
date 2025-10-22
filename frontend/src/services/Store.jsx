import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Userslice';
import cartReducer from './Cartslice';
import { productApi } from './Productapi';
import { userApi } from './Userapi';


export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware, userApi.middleware),
});

