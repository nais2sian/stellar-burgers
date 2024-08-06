import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  NotFound404,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders
} from '@pages';

import { Provider } from 'react-redux';
import store from '../../services/store';
import '../../index.css';
import styles from './app.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Modal } from '../../components/modal';
import { OrderInfo } from '../../components/order-info';
import { IngredientDetails } from '../../components/ingredient-details';
import { AppHeader } from '@components';
import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Получаем состояние авторизации из Redux store
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const location = useLocation();

  if (!isAuthenticated) {
    // Если пользователь не авторизован, перенаправляем на страницу логина
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};



export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className={styles.app}>
          <AppHeader />
          <Routes>
            <Route path='/' element={<ConstructorPage />} />
            <Route path='/feed' element={<Feed />} />
            <Route
              path='/login'
              element={
                <ProtectedRoute>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path='/register'
              element={
                <ProtectedRoute>
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path='/forgot-password'
              element={
                <ProtectedRoute>
                  <ForgotPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path='/reset-password'
              element={
                <ProtectedRoute>
                  <ResetPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile/orders'
              element={
                <ProtectedRoute>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            />

            <Route
              path='/feed/:number'
              element={
                <Modal title='Order Information'>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal title='Ingredients Details'>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <Modal title='OrderInfo'>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route path='*' element={<NotFound404 />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
