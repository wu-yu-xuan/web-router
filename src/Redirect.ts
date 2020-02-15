import { RedirectProps } from 'web-router';
import useHistory from './useHistory';
import { useEffect } from 'react';

export default function Redirect({
  to,
  push = false
}: RedirectProps): React.ReactElement | null {
  const history = useHistory();
  useEffect(() => {
    (push ? history.push : history.replace)(to);
  }, [to]);
  return null;
}
