import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const { bun, ingredients } = useSelector(
    (state: RootState) => state.burgerConstructor
  );
  console.log('ingredients:', ingredients, Array.isArray(ingredients));
  const constructorItems = {
    bun: bun || { name: '', price: 0, image: '' },
    ingredients: ingredients
  };

  const orderRequest = false;
  const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
     
  };

  const closeOrderModal = () => {

  };

  const price = useMemo(() => {
    let total = constructorItems.bun ? constructorItems.bun.price * 2 : 0;

    for (let i = 0; i < constructorItems.ingredients.length; i++) {
      total += constructorItems.ingredients[i].price;
    }

    return total;
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
