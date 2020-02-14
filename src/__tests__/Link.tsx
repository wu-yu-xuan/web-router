import React from 'react';
import Router from '../Router';
import { render } from '@testing-library/react';
import Link from '../Link';

it('should works when link clicked', () => {
  function App() {
    return (
      <Router>
        <Link to="/abc" />
      </Router>
    );
  }
  const { container } = render(<App />);
  const anchor = container.querySelector('a');
  expect(anchor?.href).toBe(window.location.href + 'abc');
  expect(window.location.pathname).toBe('/');
  anchor?.click();
  expect(window.location.pathname).toBe('/abc');
  anchor?.click();
  expect(window.location.pathname).toBe('/abc');
  expect(window.history.length).toBe(3);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <a
        href="/abc"
      />
    </div>
  `);
});
