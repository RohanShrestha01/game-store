import classes from './GameCard.module.css';

import { GamePlatforms } from './GamePlatforms';
import { CircularScoreProgress } from '../styles/CircularScoreProgress';
import { GamePrice } from './GamePrice';
import { useGamesData } from '../hooks/useGamesData';
import { Skeleton } from '@mui/material';
import { Error } from '../pages/Error';

export const GameCard = ({ category, id }) => {
  const { games, gamesIsLoading, gamesError, pricesList, pricesIsLoading } =
    useGamesData(category);

  if (gamesIsLoading)
    return (
      <Skeleton
        variant="rounded"
        className={classes['game-card']}
        height={250}
      />
    );

  if (gamesError) return <Error error={gamesError} />;

  const game = games[id];
  const bgImageSrc =
    game?.bgImage?.slice(0, 28) + 'crop/600/400/' + game?.bgImage?.slice(28);

  const genres = game.genres.map(genre => genre.name).join(', ');

  return (
    <div className={classes['game-card']}>
      {game.metacriticScore && (
        <div className={classes.game__score}>
          <CircularScoreProgress value={game.metacriticScore} />
        </div>
      )}
      <img
        src={bgImageSrc}
        alt={game.name + ' Game'}
        className={classes.game__image}
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
              prices={pricesList[id].list[0]}
              releaseDate={game.released}
              variant="gameCard"
            />
          )}
          <span className={classes.game__platforms}>
            <GamePlatforms platforms={game.platforms} />
          </span>
        </div>
      </div>
    </div>
  );
};
