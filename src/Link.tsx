import React, { useCallback } from 'react';
import { LinkProps } from 'web-router';
import useHistory from './useHistory';

function isModifiedEvent(event: React.MouseEvent<HTMLAnchorElement>) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

export default React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  props: LinkProps,
  ref
) {
  const history = useHistory();
  const { to, ...restProps } = props;
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      props.onClick?.(event);
      if (
        !event.defaultPrevented && // onClick prevented default
        event.button === 0 && // ignore everything but left clicks
        (!props.target || props.target === '_self') && // let browser handle "target=_blank" etc.
        !isModifiedEvent(event) // ignore clicks with modifier keys
      ) {
        event.preventDefault();
        history.push(to);
      }
    },
    [props.onClick, to, props.target, history.push]
  );
  return <a {...restProps} onClick={handleClick} href={to} ref={ref} />;
});
