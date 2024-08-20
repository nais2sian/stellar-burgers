import { allOrdersSlice, initialState, getAllOrders } from './allOrdersSlice';

describe('allOrdersSlice', () => {
  test('должен обработать getAllOrders.pending', () => {
    const action = { type: getAllOrders.pending.type };
    const state = allOrdersSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  test('должен обработать getAllOrders.fulfilled', () => {
    const mockOrders = [
      { id: 1, name: 'Order 1' },
      { id: 2, name: 'Order 2' },
    ];
    const action = { type: getAllOrders.fulfilled.type, payload: mockOrders };
    const state = allOrdersSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
  });

  test('должен обработать getAllOrders.rejected', () => {
    const action = { type: getAllOrders.rejected.type };
    const state = allOrdersSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual([]);
  });
});
