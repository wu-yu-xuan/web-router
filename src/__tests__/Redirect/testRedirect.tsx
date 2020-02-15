import { useHistory, Router, useLocation, Redirect } from 'web-router';
import React from 'react';
import { render } from '@testing-library/react';

/**
 * i need beforeEach(resetDOM) !!!
 */
export default function testRedirect(push: boolean) {
  return () => {
    let rerenderCount = 0;
    const target = ['/', '/abc'];
    function Child() {
      const history = useHistory();
      const location = useLocation();
      expect(location.pathname).toBe(target[rerenderCount]);
      expect(history.length).toBe(push ? rerenderCount + 1 : 1);
      rerenderCount++;
      return <div />;
    }
    function App() {
      return (
        <Router>
          <Child />
          <Redirect to="/abc" push={push} />
        </Router>
      );
    }
    expect(window.location.pathname).toBe('/');
    const { container } = render(<App />);
    expect(window.location.pathname).toBe('/abc');
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div />
      </div>
    `);
  };
}

it('Your test suite must contain at least one test.', () => {
  expect('').toBe('');
});
