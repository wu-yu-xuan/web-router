import RouterContext from './RouterContext';
import { History } from 'web-router';
import React from 'react';

export default function useHistory<State = {}>(): History<State> {
  return React.useContext(RouterContext).history as History<State>;
}
