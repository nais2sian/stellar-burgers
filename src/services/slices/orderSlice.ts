import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api'; // Импортируем API для заказа
import { TOrder } from '../../utils/types'; // Importing the TOrder type

// Defining the OrderState interface using TOrder for the order property
type OrderState = {
  order: TOrder | null;
  orderRequest: boolean;
  orderError: string | null;
};

// Initial state setup for the order slice
const initialState: OrderState = {
  order: null,
  orderRequest: false,
  orderError: null
};

export const placeOrder = createAsyncThunk<
  TOrder, // Return type of the Thunk
  string[], // Argument type for Thunk (ingredients IDs)
  { rejectValue: string } // Error type
>('order/placeOrder', async (ingredientsIds, thunkAPI) => {
  try {
    const response = await orderBurgerApi(ingredientsIds);
    return response.order; // Return the entire order object
  } catch (error) {
    return thunkAPI.rejectWithValue('Ошибка при отправке заказа');
  }
});

// Redux slice for order
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.order = null;
      state.orderError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(placeOrder.fulfilled, (state, action: PayloadAction<TOrder>) => {
        state.orderRequest = false;
        state.order = action.payload; // Store the complete order object
      })
      .addCase(
        placeOrder.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.orderRequest = false;
          state.orderError = action.payload || 'Неизвестная ошибка';
        }
      );
  }
});

// Exporting the action creators and reducer
export const { resetOrderState } = orderSlice.actions;

export default orderSlice.reducer;
