import { useDispatch } from 'react-redux';
import { Skeleton } from '@mui/material';
import { useState } from 'react';

import classes from './GameCard.module.css';

import { GamePlatforms } from './GamePlatforms';
import { GamePrice } from './GamePrice';
import { useGamesData } from '../../hooks/useGamesData';
import { ActionButtons } from './ActionButtons';
import { gameModalActions } from '../../store/gameModalSlice';
import { BookmarksButton } from './BookmarksButton';

export const GameCard = ({ category, id, page, searchQuery = null }) => {
  const [showBtns, setShowBtns] = useState(false);
  const { games, gamesIsLoading, gamesError, pricesList, pricesIsLoading } =
    useGamesData(category, page, searchQuery);
  const dispatch = useDispatch();

  if (gamesIsLoading)
    return (
      <Skeleton
        variant="rounded"
        className={classes['game-card']}
        height={250}
      />
    );

  if (gamesError) return;

  const game = games[id];
  const bgImageSrc = game.bgImage
    ? game.bgImage?.slice(0, 28) + 'crop/600/400/' + game?.bgImage.slice(28)
    : 'https://dummyimage.com/600x400/000000/f5f5f5.png&text=Image+Not+Found';

  const genres = game.genres.map(genre => genre.name).join(', ');

  return (
    <div
      className={classes['game-card']}
      onMouseEnter={() => setShowBtns(true)}
      onMouseLeave={() => setShowBtns(false)}
      onClick={() =>
        !pricesIsLoading &&
        dispatch(
          gameModalActions.showModal({
            game,
            pricesList: pricesList?.[id]?.list,
          })
        )
      }
    >
      <img
        src={bgImageSrc}
        alt={game.name + ' Game'}
        className={classes.game__image}
        loading="lazy"
      />
      <div className={classes.game__details}>
        <h3 className={classes.game__title} title={game.name}>
          {game.name}
        </h3>
        <p className={classes.game__genre} title={genres}>
          {genres}
        </p>
        <div className={classes.game__section}>
          {pricesIsLoading ? (
            <div>Loading...</div>
          ) : (
            <GamePrice
              prices={pricesList?.[id]?.list[0]}
              releaseDate={game.released}
              variant="game-card__price"
            />
          )}
          <span className={classes.game__platforms}>
            <GamePlatforms platforms={game.platforms} />
          </span>
        </div>
      </div>
      {!pricesIsLoading && showBtns && (
        <>
          <ActionButtons
            game={game}
            prices={pricesList?.[id]?.list[0]}
            variant="game-card__btns"
          />
          <BookmarksButton
            variant="icon"
            game={game}
            prices={pricesList?.[id].list[0]}
          />
        </>
      )}
    </div>
  );
};
