import { Location } from 'web-router';
import RouterContext from './RouterContext';
import React from 'react';

export default function useLocation(): Location {
  return React.useContext(RouterContext).location as Location;
}
