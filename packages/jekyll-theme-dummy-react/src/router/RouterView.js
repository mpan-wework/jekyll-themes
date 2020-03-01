import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import routes from './routes';

const RouterView = (props) => {
  return (
    <Switch>
      {routes.map((route) => {
        if (route.redirect) {
          return (
            <Redirect
              key={route.path}
              to={route.redirect}
            />
          );
        }

        return (
          <Route
            key={route.path}
            path={route.path}
            exact={!!route.exact}
            render={(routeProps) => (
              <route.component
                {...props}
                {...routeProps}
              />
            )}
          />
        );
      })}
    </Switch>
  );
};

export default RouterView;
