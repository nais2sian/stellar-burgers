
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
  orderData: {
    createdAt: string;
    ingredients: string[];
    _id: string;
    status: string;
    name: string;
    updatedAt: string;
    number: number;
  } | null;
  orderRequest: boolean;
}

const initialState: OrderState = {
  orderData: null,
  orderRequest: false,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderData: (state, action: PayloadAction<OrderState['orderData']>) => {
      state.orderData = action.payload;
      state.orderRequest = false;
    },
    startOrderRequest: (state) => {
      state.orderRequest = true;
    },
    clearOrderData: (state) => {
      state.orderData = null;
    },
  },
});

export const { setOrderData, startOrderRequest, clearOrderData } = orderSlice.actions;

export default orderSlice.reducer;
