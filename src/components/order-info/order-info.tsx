import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useDispatch } from '../../services/store';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { getOrderByNumberApi } from '@api';
import { getIngredients, selectIngredients } from '../../services/slices/ingredientsSlice';

// ИНФОРМАЦИЯ О ЗАКАЗЕ В ЛЕНТЕ ЗАКАЗОВ 
export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const [orderData, setOrderData] = useState<TOrder>({
    _id: '',
    createdAt: '',
    ingredients: [],
    status: '',
    name: '',
    updatedAt: 'string',
    number: 0
  });

  const id = Number(useParams().number);
  const ingredients: TIngredient[] = useSelector(getIngredients);
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  useEffect(() => {
    getOrderByNumberApi(Number(id)).then((data) => {
      setOrderData(data.orders[0]);
    });
  }, []);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
//   const orderData = {
//     createdAt: '',
//     ingredients: [],
//     _id: '',
//     status: '',
//     name: '',
//     updatedAt: 'string',
//     number: 0
//   };
  
//   const ingredients: TIngredient[] = [];

//   /* Готовим данные для отображения */
//   const orderInfo = useMemo(() => {
//     if (!orderData || !ingredients.length) return null;

//     const date = new Date(orderData.createdAt);

//     type TIngredientsWithCount = {
//       [key: string]: TIngredient & { count: number };
//     };

//     const ingredientsInfo = orderData.ingredients.reduce(
//       (acc: TIngredientsWithCount, item) => {
//         if (!acc[item]) {
//           const ingredient = ingredients.find((ing) => ing._id === item);
//           if (ingredient) {
//             acc[item] = {
//               ...ingredient,
//               count: 1
//             };
//           }
//         } else {
//           acc[item].count++;
//         }

//         return acc;
//       },
//       {}
//     );

//     const total = Object.values(ingredientsInfo).reduce(
//       (acc, item) => acc + item.price * item.count,
//       0
//     );

//     return {
//       ...orderData,
//       ingredientsInfo,
//       date,
//       total
//     };
//   }, [orderData, ingredients]);

//   if (!orderInfo) {
//     return <Preloader />;
//   }

//   return <OrderInfoUI orderInfo={orderInfo} />;
// };
