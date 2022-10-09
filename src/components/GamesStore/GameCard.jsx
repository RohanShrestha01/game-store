import classes from './GameCard.module.css';

import { GamePlatforms } from './GamePlatforms';
import { CircularScoreProgress } from '../../styles/CircularScoreProgress';
import { GamePrice } from './GamePrice';
import { useGamesData } from '../../hooks/useGamesData';
import { Skeleton } from '@mui/material';
import { ActionButtons } from './ActionButtons';

export const GameCard = ({ category, id, page }) => {
  const { games, gamesIsLoading, pricesList, pricesIsLoading } = useGamesData(
    category,
    page
  );

  if (gamesIsLoading)
    return (
      <Skeleton
        variant="rounded"
        className={classes['game-card']}
        height={250}
      />
    );

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
              variant="game-card__price"
            />
          )}
          <span className={classes.game__platforms}>
            <GamePlatforms platforms={game.platforms} />
          </span>
        </div>
        {!pricesIsLoading && (
          <ActionButtons
            prices={pricesList[id].list[0]}
            variant="game-card__btns"
          />
        )}
      </div>
    </div>
  );
};
