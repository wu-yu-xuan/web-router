import { pathToRegexp, Key } from 'path-to-regexp';
import { Params } from 'web-router';

interface Cache {
  [key: string]: {
    regexp: RegExp;
    keys: Key[];
  };
}

const cache: Cache = {};

function accessCache(path: string) {
  if (path in cache) {
    return cache[path];
  }
  const keys: Key[] = [];
  const regexp = pathToRegexp(path, keys, { end: false });
  return (cache[path] = {
    keys,
    regexp
  });
}

export default function matchRoute(
  path: string,
  pathname?: string
): Params | null {
  const { regexp, keys } = accessCache(path);
  const match = regexp.exec(pathname ?? window.location.pathname);
  if (!match) {
    return match;
  }
  const [, ...values] = match;
  return keys.reduce<Params>((memo, key, index) => {
    memo[key.name] = values[index];
    return memo;
  }, {});
}
