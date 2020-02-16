import { RouteProps } from 'web-router';
import matchRoute from './matchRoute';
import RouterContext from './RouterContext';
import React from 'react';

export default function Route({ children, path }: RouteProps) {
  const params = matchRoute(path);
  const context = React.useContext(RouterContext);
  if (!params) {
    return null;
  }
  return (
    <RouterContext.Provider value={{ ...context, params }}>
      {children}
    </RouterContext.Provider>
  );
}
