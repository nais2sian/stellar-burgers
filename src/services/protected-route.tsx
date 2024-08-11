// import {
//   useLocation,
//   useNavigate,
//   Navigate as NavigateComponent
// } from 'react-router-dom';

// import { useSelector, useDispatch } from './store';
// import { isAuthCheckedSelector, getUser } from './slices/userSlice';

// type ProtectedRouteProps = {
//   onlyUnAuth?: boolean;
//   children: React.ReactElement;
// };

// export const ProtectedRoute = ({
//   onlyUnAuth = false,
//   children
// }: ProtectedRouteProps) => {
//   const isAuthChecked = useSelector(isAuthCheckedSelector);
//   const location = useLocation();
//   const navigate = useNavigate();

//   if (!onlyUnAuth && !isAuthChecked) {
//     return <NavigateComponent replace to='/login' state={{ from: location }} />;
//   }

//   if (onlyUnAuth && isAuthChecked) {
//     const fromPage = location.state?.from || { pathname: '/' };
//     return <NavigateComponent replace to={fromPage} />;
//   }
//   return children;
// };
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../services/store';
import { isAuthCheckedSelector } from '../services/slices/userSlice';
import { RootState } from '../services/store';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const location = useLocation();

  if (!onlyUnAuth && !isAuthChecked) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuthChecked) {
    const fromPage = location.state?.from || { pathname: '/' };

    return <Navigate replace to={fromPage} />;
  }
  return children;
};
