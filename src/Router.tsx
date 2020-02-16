import React from 'react';
import createHistory from './createHistory';
import RouterContext from './RouterContext';

const { listen, ...initRouter } = createHistory();
listen((history, location) => {
  initRouter.history = history;
  initRouter.location = location;
});

export default function Router({ children }: React.PropsWithChildren<{}>) {
  const [router, setRouter] = React.useState(initRouter);
  const unlisten = React.useRef<() => void>();
  if (!unlisten.current) {
    // This is a bit of a hack. We have to start listening for location
    // changes here in the constructor in case there are any <Redirect>s
    // on the initial render. If there are, they will replace/push when
    // they mount and since cDM fires in children before parents, we may
    // get a new location before the <Router> is mounted.
    unlisten.current = listen((history, location) =>
      setRouter({ history, location })
    );
  }
  React.useEffect(() => unlisten.current, []);
  return (
    <RouterContext.Provider value={{ ...router, params: {} }}>
      {children}
    </RouterContext.Provider>
  );
}
