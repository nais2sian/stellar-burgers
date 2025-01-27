import {
  burgerConstructorSlice,
  addIngredient,
  removeIngredient,
  ConstructorState
} from './burgerConstructorSlice';
import { TConstructorIngredient } from '../../utils/types';

jest.mock('uuid', () => ({
  v4: () => 'test-uuid'
}));
describe('burgerConstructorSlice', () => {
  test('заменяем булочки', () => {
    let state: ConstructorState = {
      bun: {
        _id: '2',
        name: 'Bun',
        type: 'bun',
        proteins: 50,
        calories: 220,
        carbohydrates: 110,
        fat: 12,
        price: 6,
        image: 'new_image.png',
        image_large: 'new_image_large.png',
        image_mobile: 'new_image_mobile.png',
        id: 'test-uuid'
      },
      ingredients: []
    };
    const newBun: TConstructorIngredient = {
      _id: '643d69a5c3f7b9001cfa093c',
      id: 'test-uuid',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    };
    state = burgerConstructorSlice.reducer(state, addIngredient(newBun));
    expect(state.bun).toEqual(newBun);
  });

  test('добавляем ингредиент, если это не булочка', () => {
    const initialState = {
      bun: null,
      ingredients: []
    };

    const newIngredient: TConstructorIngredient = {
      id: 'test-uuid',
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    };

    let state = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(newIngredient)
    );

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(
      expect.objectContaining({
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main'
      })
    );
  });

  test('удаляем ингедиент', () => {
    const initialState = {
      bun: null,
      ingredients: [] as TConstructorIngredient[]
    };
    const ingredientToRemove: TConstructorIngredient = {
      id: 'test-uuid',
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    };

    let state = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(ingredientToRemove)
    );

    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0]).toEqual(
      expect.objectContaining({ _id: '643d69a5c3f7b9001cfa0941' })
    );

    state = burgerConstructorSlice.reducer(
      state,
      removeIngredient(ingredientToRemove)
    );

    expect(state.ingredients.length).toBe(0);
  });
});
