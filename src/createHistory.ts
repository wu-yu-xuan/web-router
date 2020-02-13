import { History, Location, Callback } from 'web-router';

function getLocation(): Location {
  const {
    hash,
    host,
    hostname,
    href,
    pathname,
    port,
    protocol,
    origin
  } = window.location;
  return { hash, host, hostname, href, pathname, port, protocol, origin };
}

export default function createHistory(): {
  history: History;
  location: Location;
  listen: (callback: Callback) => () => void;
} {
  const globalHistory = window.history;
  let listeners: Callback[] = [];
  function callListeners() {
    listeners.forEach(callback =>
      callback(
        Object.assign(history, {
          length: globalHistory.length,
          state: globalHistory.state
        }),
        getLocation()
      )
    );
  }
  function listen(callback: Callback) {
    listeners.push(callback);
    if (listeners.length === 1) {
      /**
       * start listen
       */
      window.addEventListener('popstate', callListeners);
    }
    // call callback first to ensure get the newest value
    callback(
      Object.assign(history, {
        length: globalHistory.length,
        state: globalHistory.state
      }),
      getLocation()
    );
    return () => {
      listeners = listeners.filter(v => v !== callback);
      if (listeners.length === 0) {
        /**
         * stop listen
         */
        window.removeEventListener('popstate', callListeners);
      }
    };
  }
  function push(url: string, state: any = {}) {
    globalHistory.pushState(state, '', url);
    callListeners();
  }
  function replace(url: string, state: any = {}) {
    globalHistory.replaceState(state, '', url);
    callListeners();
  }
  const history: History = {
    length: globalHistory.length,
    push,
    replace,
    state: globalHistory.state,
    // 以下三个会触发 popstate 事件
    go: delta => globalHistory.go(delta),
    forward: () => globalHistory.forward(),
    back: () => globalHistory.back()
  };
  return {
    history,
    location: getLocation(),
    listen
  };
}
