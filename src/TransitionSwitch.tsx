import 'react/experimental';
import React, { useState, useEffect, useTransition, Suspense } from 'react';
import {
  Route,
  useLocation,
  FixedProgress,
  TransitionSwitchProps
} from 'web-router';
import matchRoute from './matchRoute';

export default function TransitionSwitch({
  children,
  fallback = null,
  timeoutMs
}: TransitionSwitchProps) {
  const { pathname } = useLocation();
  const [element, setElement] = useState<React.ReactElement | null>(null);
  const [startTransition, isPending] = useTransition(
    timeoutMs === undefined ? undefined : { timeoutMs }
  );
  useEffect(() => {
    let found = false;
    React.Children.forEach(children, child => {
      if (!found && React.isValidElement(child) && child.type === Route) {
        const match = matchRoute(child.props.path ?? '/', pathname);
        if (match) {
          found = true;
          startTransition(() => setElement(child));
        }
      }
    });
  }, [pathname]);

  return (
    <>
      <FixedProgress show={isPending} />
      <Suspense fallback={fallback}>{element}</Suspense>
    </>
  );
}
