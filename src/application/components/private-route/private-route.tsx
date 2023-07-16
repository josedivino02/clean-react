import React from 'react';
import { Navigate, Route, type RouteProps } from 'react-router-dom';

const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const isTokenPresent = false;

  return isTokenPresent ? <Route {...props} /> : <Navigate to="/login" />
}

export default PrivateRoute
