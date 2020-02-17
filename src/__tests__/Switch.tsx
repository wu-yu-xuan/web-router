import { Router, Switch, Redirect, Route } from 'web-router';
import React, { useState, useEffect } from 'react';
import { render, waitForDomChange } from '@testing-library/react';

it('Switch should work', async () => {
  const urls = ['/abc', '/def', '/abc/def', '/'];
  function App() {
    const [url, setUrl] = useState('/');
    useEffect(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index >= urls.length) {
          clearInterval(interval);
        }
        setUrl(urls[index++]);
      }, 500);
      return () => clearInterval(interval);
    }, []);
    return (
      <Router>
        <Redirect to={url} />
        <Switch>
          {urls.map((v, i) => (
            <Route path={v} key={i}>
              <p>{v}</p>
            </Route>
          ))}
        </Switch>
      </Router>
    );
  }
  const { container } = render(<App />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <p>
        /
      </p>
    </div>
  `);
  await waitForDomChange({ container });
  expect(container).toMatchInlineSnapshot(`
    <div>
      <p>
        /abc
      </p>
    </div>
  `);
  await waitForDomChange({ container });
  expect(container).toMatchInlineSnapshot(`
    <div>
      <p>
        /def
      </p>
    </div>
  `);
  await waitForDomChange({ container });
  expect(container).toMatchInlineSnapshot(`
    <div>
      <p>
        /abc
      </p>
    </div>
  `);
  await waitForDomChange({ container });
  expect(container).toMatchInlineSnapshot(`
    <div>
      <p>
        /
      </p>
    </div>
  `);
});
