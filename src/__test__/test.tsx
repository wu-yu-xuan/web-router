import useHistory from '../useHistory';
import useLocation from '../useLocation';
import React from 'react';
import Router from '../Router';
import { render } from '@testing-library/react';

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
