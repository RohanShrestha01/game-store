import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import classes from './Backdrop.module.css';

export const Backdrop = ({ resetFn, show }) => {
  const dispatch = useDispatch();
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
      in={show}
      timeout={200}
    >
      <div
        ref={nodeRef}
        className={classes.backdrop}
        onClick={() => {
          dispatch(resetFn());
        }}
      />
    </CSSTransition>
  );
};
