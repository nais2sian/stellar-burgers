import { useEffect, FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch } from '../../services/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../services/store';
import { ingredientsThunk } from '../../services/slices/ingredientsSlice';
import { TIngredient } from '../../utils/types';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const ingredientData = useSelector((state: RootState) =>
    state.ingredients.ingredients.find((item: TIngredient) => item._id === id)
  );

  useEffect(() => {
    dispatch(ingredientsThunk());
  }, [dispatch]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
