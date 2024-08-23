import { v4 as uuidv4 } from 'uuid';
import { TConstructorIngredient } from '../../utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

export const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TConstructorIngredient) => {
        const id = uuidv4();
        return {
          payload: {
            ...ingredient,
            id
          }
        };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    updateAll: (state, action: PayloadAction<TConstructorIngredient[]>) => {
      state.ingredients = action.payload;
    }
  },
  selectors: {
    selectItems: (state: ConstructorState) => state
  }
});

export const { addIngredient, removeIngredient, clearConstructor, updateAll } =
  burgerConstructorSlice.actions;
export const selectIngredients = (state: ConstructorState) => state;
export const burgerConstructorSelector = burgerConstructorSlice.selectors;
