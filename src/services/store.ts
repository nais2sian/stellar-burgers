import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsSlice } from '../services/slices/ingredientsSlice';
import { burgerConstructorSlice } from '../services/slices/burgerConstructorSlice';
import { orderSlice } from '../services/slices/orderSlice';
import { authReducer } from '../services/slices/userSlice';
import { feedSlice } from '../services/slices/feedSlice';
import { getAllOrders, allOrdersSlice } from '../services/slices/allOrdersSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const ingredientsReducer = ingredientsSlice.reducer;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const orderReducer = orderSlice.reducer;
export const ordersReducer = feedSlice.reducer;
export const allOrdersReducer = allOrdersSlice.reducer;

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  user: authReducer,
  feed: ordersReducer,
  allOrders: allOrdersReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export default store;
