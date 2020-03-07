import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';

import routes from './routes';

const RouterView = (props) => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const urlMatch = new RegExp(/\/posts\/[^?#]+$/).exec(
      window.location.pathname,
    );
    const routeMatch = new RegExp(/\/posts\/[^?#]+$/).exec(location.pathname);

    if (location.pathname === '/') {
      if (urlMatch) {
        // /posts/xxx#/ => /posts/xxx#/posts/xxx
        setTimeout(() => {
          history.replace(urlMatch[0]);
        }, 0);
      }
    } else if (routeMatch) {
      if (urlMatch) {
        // /posts/xxx#/posts/xxx => /#/posts/xxx
        const url =
          window.location.origin +
          window.location.pathname.replace(urlMatch, '') +
          window.location.search +
          window.location.hash;
        window.history.replaceState(null, null, url);
      }
    }
  }, [location, history]);
  return (
    <Switch>
      {routes.map((route) => {
        if (route.redirect) {
          return <Redirect key={route.path} to={route.redirect} />;
        }

        return (
          <Route
            key={route.path}
            path={route.path}
            exact={!!route.exact}
            render={(routeProps) => (
              <route.component {...props} {...routeProps} />
            )}
          />
        );
      })}
    </Switch>
  );
};

export default RouterView;
