import { useParams, Router, Route, Redirect } from 'web-router';
import React from 'react';
import { render } from '@testing-library/react';

it('Route and useParams should work', () => {
  function Child() {
    const { title } = useParams<{ title: string }>();
    expect(title).toBe('some/long/path');
    return <p>{title}</p>;
  }
  function App() {
    return (
      <Router>
        <Redirect to="/some/long/path" />
        <Route path="/:title(.+)">
          <Child />
        </Route>
      </Router>
    );
  }
  const { container } = render(<App />);
  expect(window.location.pathname).toBe('/some/long/path');
  expect(container).toMatchInlineSnapshot(`
    <div>
      <p>
        some/long/path
      </p>
    </div>
  `);
});
