import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getAllOrders, allOrdersSlice, listOfOrders } from '../../services/slices/allOrdersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);
  const orders: TOrder[] = useSelector(listOfOrders);
  return <ProfileOrdersUI orders={orders} />;
};
