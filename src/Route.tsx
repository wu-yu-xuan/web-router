import { RouteProps } from 'web-router';
import matchRoute from './matchRoute';
import RouterContext from './RouterContext';
import React from 'react';

export default function Route({ children, path }: RouteProps) {
  const context = React.useContext(RouterContext);
  const params = matchRoute(path, context.location?.pathname);
  if (!params) {
    return null;
  }
  return (
    <RouterContext.Provider value={{ ...context, params }}>
      {children}
    </RouterContext.Provider>
  );
}
