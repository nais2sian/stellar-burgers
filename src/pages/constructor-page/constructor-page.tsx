// import { useSelector, useDispatch } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// export const ConstructorPage: FC = () => {
//   /** TODO: взять переменную из стора */
//   const isIngredientsLoading = false;

//   return (
//     <>
//       {isIngredientsLoading ? (
//         <Preloader />
//       ) : (
//         <main className={styles.containerMain}>
//           <h1
//             className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
//           >
//             Соберите бургер
//           </h1>
//           <div className={`${styles.main} pl-5 pr-5`}>
//             <BurgerIngredients />
//             <BurgerConstructor />
//           </div>
//         </main>
//       )}
//     </>
//   );
// };

// import React, { FC, useEffect } from 'react';
// import { useSelector, useDispatch } from '../../services/store';
// import styles from './ConstructorPage.module.css'; 
// import { Preloader } from '../../components/ui';
// import { BurgerIngredients, BurgerConstructor } from '@components'; 
import { ingredientsThunk, selectIngredientsLoading } from '../../services/slices/ingredientsSlice'; 

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();
  const isIngredientsLoading = false;

  // Получаем состояние загрузки из селектора
  // const isIngredientsLoading = useSelector(selectIngredientsLoading);
  // useEffect(() => {
  //   dispatch(ingredientsThunk());
  // }, []); // Run only once on component mount
  

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
