import { Params } from 'web-router';
import RouterContext from './RouterContext';
import React from 'react';

export default function useParams<T extends Params = Params>(): T {
  return React.useContext(RouterContext).params as T;
}
