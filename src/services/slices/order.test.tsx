import {
  orderSlice,
  placeOrder,
  resetOrderState,
  initialState
} from './orderSlice';
import { TOrder } from '../../utils/types';

describe('orderSlice reducer', () => {
  test('должен установить orderRequest в true при placeOrder.pending', () => {
    const action = { type: placeOrder.pending.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state.orderRequest).toBe(true);
    expect(state.orderError).toBeNull();
  });

  test('должен обработать placeOrder.fulfilled', () => {
    const mockOrder: TOrder = {
      _id: 'order123',
      status: 'done',
      name: 'Test Order',
      createdAt: '2023-01-01T12:00:00Z',
      updatedAt: '2023-01-01T12:00:00Z',
      number: 12345,
      ingredients: ['ingredient1', 'ingredient2']
    };
    const action = { type: placeOrder.fulfilled.type, payload: mockOrder };
    const state = orderSlice.reducer(initialState, action);

    expect(state.orderRequest).toBe(false);
    expect(state.order).toEqual(mockOrder);
    expect(state.orderError).toBeNull();
  });

  test('должен обработать placeOrder.rejected', () => {
    const action = {
      type: placeOrder.rejected.type,
      payload: 'Ошибка при отправке заказа'
    };
    const state = orderSlice.reducer(initialState, action);

    expect(state.orderRequest).toBe(false);
    expect(state.order).toBeNull();
    expect(state.orderError).toBe('Ошибка при отправке заказа');
  });
});
