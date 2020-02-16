import { History, Location, Params } from 'web-router';
import React from 'react';

const RouterContext = React.createContext<{
  history?: History;
  location?: Location;
  params?: Params;
}>({});

export default RouterContext;
