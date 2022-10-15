import { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { gameModalActions } from '../../../store/gameModalSlice';
import { Backdrop } from './Backdrop';

import classes from './GameOverlay.module.css';

const GameModal = () => {
  const nodeRef = useRef(null);

  const game = useSelector(state => state.gameModal.game);
  const pricesList = useSelector(state => state.gameModal.pricesList);
  const showOverlay = useSelector(state => state.gameModal.show);

  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
      in={showOverlay}
      timeout={200}
      classNames={{
        enter: classes['game-modal--enter'],
        enterActive: classes['game-modal--enter-active'],
        exit: classes['game-modal--exit'],
        exitActive: classes['game-modal--exit-active'],
      }}
    >
      <section className={classes['game-modal']} ref={nodeRef}>
        <video
          controls
          loop
          autoPlay
          className={classes['game-modal__video']}
          poster={
            game.clips?.full
              ? null
              : 'https://dummyimage.com/1920x1080/16181e/f5f5f5.png&text=Sorry,+no+clip+available+for+this+game.'
          }
        >
          {game.clips?.full && (
            <source src={game.clips?.full} type="video/mp4" />
          )}
        </video>
        <div className={classes['game-modal__deals']}>
          <h2 className={classes['deals__header']}>All Deals</h2>
          {pricesList.length === 0 ? (
            <p className={classes['deals__empty-text']}>
              Sorry, no deals are available.
            </p>
          ) : (
            <ul className={classes['deals__list']}>
              {pricesList.map((price, id) => (
                <li key={id} className={classes['deals__item']}>
                  <a
                    href={price.url}
                    target="_blank"
                    rel="noreferrer"
                    className={classes['deals__link']}
                  >
                    <span>{price.shop.name}</span>
                    <span>
                      {price.price_new === 0
                        ? 'Free'
                        : '$' + price.price_new.toFixed(2)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </CSSTransition>
  );
};

export const GameOverlay = () => {
  const showOverlay = useSelector(state => state.gameModal.show);

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop resetFn={gameModalActions.reset} show={showOverlay} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <GameModal />,
        document.getElementById('modal-root')
      )}
    </>
  );
};
