import { History, Location } from 'web-router';
import React from 'react';

const RouterContext = React.createContext<{
  history?: History;
  location?: Location;
}>({});

export default RouterContext;
