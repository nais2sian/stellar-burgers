import { expect, test } from '@jest/globals';
import { rootReducer } from './store'
import { initialState as ingredientsInitialState } from '../services/slices/ingredientsSlice';
import { initialState as burgerConstructorInitialState } from '../services/slices/burgerConstructorSlice';
import { initialState as orderInitialState } from '../services/slices/orderSlice';
import { initialState as authInitialState } from '../services/slices/userSlice';
import { initialState as feedInitialState } from '../services/slices/feedSlice';
import { initialState as allOrdersInitialState } from '../services/slices/allOrdersSlice';


describe('rootReducer', () => {
  test('возврат начального состояния хранилища при unknown action', () => {
    const initialState = {
      ingredients: ingredientsInitialState,
      burgerConstructor: burgerConstructorInitialState,
      order: orderInitialState,
      user: authInitialState,
      feed: feedInitialState,
      allOrders: allOrdersInitialState,
    };

    const action = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, action);

    expect(state).toEqual(initialState);
  });
});
