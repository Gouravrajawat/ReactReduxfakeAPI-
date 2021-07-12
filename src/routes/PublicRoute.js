import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { editUsers } from "./App";
const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      editUsers() && restricted ?
        <Redirect to="/edit/:id" />
        : <Component {...props} />
    )} />
  );
};

export default PublicRoute;