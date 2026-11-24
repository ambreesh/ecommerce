import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // Reprent the complet Redux state strecture
export type AppDsipatch = typeof store.dispatch; // Represnt the Redux dispatch function type.
