import { useLocation, Route } from 'web-router';
import React from 'react';
import matchRoute from './matchRoute';

export default function Switch({ children }: React.PropsWithChildren<{}>) {
  const { pathname } = useLocation();
  let element: React.ReactElement | null = null;
  React.Children.forEach(children, child => {
    if (
      element === null &&
      React.isValidElement(child) &&
      child.type === Route
    ) {
      const match = matchRoute(child.props.path ?? '/', pathname);
      if (match) {
        element = child;
      }
    }
  });
  return element;
}
