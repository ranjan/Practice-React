import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import DataContext from './context/DataContext';
const PrivateRoute = ({component: Component, ...rest}) => {
const { isAuthenticated } = useContext(DataContext);

  return (
    <Route {...rest} render={props => (
        isAuthenticated() ?
            <Component {...props} />
        : <Redirect to="/login" />
    )} />
  );
};

export default PrivateRoute;