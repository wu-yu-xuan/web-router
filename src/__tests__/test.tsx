import React from 'react';
import { render } from '@testing-library/react';
import { useHistory, useLocation, Router } from 'web-router';

it('is just test', () => {
  function Child() {
    const history = useHistory();
    const location = useLocation();
    console.log({ history, location });
    return <div />;
  }
  function App() {
    return (
      <Router>
        <Child />
      </Router>
    );
  }
  const { container } = render(<App />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div />
    </div>
  `);
});
