import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

const RequireAuthComponent = ({children}:{children: any}) => {
  const { isAuth } = useAppSelector(state => state.userReducer);
  const location = useLocation();

  return (
    <>
      {isAuth ? (
      children
    ) : (
        <Navigate to="auth" state={{from: location}} />
      )}
    </>
  );
};

export default RequireAuthComponent;