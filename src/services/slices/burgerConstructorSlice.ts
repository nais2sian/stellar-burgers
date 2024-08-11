import { v4 as uuidv4 } from 'uuid';
import { TIngredient, TConstructorIngredient } from '../../utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConstructorState {
  bun: TIngredient | null;
  ingredients: TIngredient[];
}

const initialState: ConstructorState = {
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
      prepare: (ingredient: TIngredient) => {
        const id = uuidv4();
        return {
          payload: {
            ...ingredient,
            id
          }
        };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient._id !== action.payload
      );
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    selectItems: (state: ConstructorState) => state
  }
});

export const { addIngredient, removeIngredient, clearConstructor } =
  burgerConstructorSlice.actions;
export const selectIngredients = (state: ConstructorState) => state;
export const burgerConstructorSelector = burgerConstructorSlice.selectors;
