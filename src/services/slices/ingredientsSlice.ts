import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../services/store'; // убедитесь, что путь правильный

interface IngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const ingredientsThunk = createAsyncThunk<TIngredient[]>(
  'data/fetchData',
  async () => {
    console.log('Запрос ингредиентов начат');
    const response = await getIngredientsApi();
    console.log('Получили ответ:', response);
    return response as TIngredient[];
  }
);



export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients: (state, action) => {
      state.ingredients = action.payload;
    }
  },
  selectors: {
    getIngredients: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(ingredientsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        console.log('Загрузка');
      })
      .addCase(ingredientsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
        console.log('Ингредиенты загружены:', action.payload);
      })
      .addCase(ingredientsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка загрузки данных';
        console.error('Ошибка загрузки:', state.error);
      });
  }
});

export const selectIngredients = (state: RootState) => state.ingredients.ingredients;
export const selectIngredientsLoading = (state: RootState) => state.ingredients.isLoading;
export const selectIngredientsError = (state: RootState) => state.ingredients.error;

export const { actions, reducer } = ingredientsSlice;
export default ingredientsSlice.reducer;
