import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds, getOrdersFeeds } from '../../services/slices/feedSlice';
import { RootState } from '../../services/store'; 

export const selectOrders = (state: RootState) => state.feed.orders; 

export const Feed: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeeds());
  }, []);
  const orders: TOrder[] =  useSelector(selectOrders)

  if (!orders.length) {
    return <Preloader />;
  }

  const handleGetAllFeeds = () => {
    dispatch(getFeeds());
  };

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        handleGetAllFeeds;
      }}
    />
  );
};
