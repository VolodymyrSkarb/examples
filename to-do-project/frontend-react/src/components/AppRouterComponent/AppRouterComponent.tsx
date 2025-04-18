import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../../routes';
import RequireAuthComponent from '../hoc/RequireAuthComponent';
import Layout from '../Layout/Layout';

const AppRouterComponent: React.FC = ()=> {
  return (
    <Routes>
      <Route path="/" element={<RequireAuthComponent><Layout /></RequireAuthComponent>}>
        {
          privateRoutes.map(route =>
            <Route path={route.path} element={<route.component/>} key={route.path}/>
          )}
      </Route>
      {
        publicRoutes.map(route =>
          <Route path={route.path} element={<route.component/>} key={route.path}/>
        )}
    </Routes>
  );
};

export default AppRouterComponent;