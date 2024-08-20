import { ingredientsThunk, initialState, ingredientsSlice } from './ingredientsSlice';
import { TIngredient } from '../../utils/types';

describe('ingredientsSlice reducer', () => {
  test('должен установить isLoading в true при ingredientsThunk.pending', () => {
    const action = { type: ingredientsThunk.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('должен обработать ingredientsThunk.fulfilled', () => {
    const mockIngredients: TIngredient[] = [
      { _id: '1', name: 'Ingredient 1', type: 'main', proteins: 20, fat: 5, carbohydrates: 10, calories: 200, price: 50, image: 'image_url', image_mobile: 'image_mobile_url', image_large: 'image_large_url' },
      { _id: '2', name: 'Ingredient 2', type: 'bun', proteins: 30, fat: 10, carbohydrates: 15, calories: 300, price: 100, image: 'image_url', image_mobile: 'image_mobile_url', image_large: 'image_large_url' }
    ];
    const action = { type: ingredientsThunk.fulfilled.type, payload: mockIngredients };
    const state = ingredientsSlice.reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.error).toBeNull();
  });

  test('должен обработать ingredientsThunk.rejected', () => {
    const action = {
      type: ingredientsThunk.rejected.type,
      error: { message: 'Ошибка загрузки данных' },
    };
    const state = ingredientsSlice.reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual([]);
    expect(state.error).toBe('Ошибка загрузки данных');
  });
});
