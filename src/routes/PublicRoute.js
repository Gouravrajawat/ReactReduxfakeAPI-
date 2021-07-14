import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userToEdit } from "./App";
const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      userToEdit() && restricted ?
        <Redirect to="/edit" />
        : <Component {...props} />
    )} />
  );
};
export default PublicRoute;