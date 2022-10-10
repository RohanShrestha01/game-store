import classes from './GamesList.module.css';

import { GameCard } from './GameCard';
import { useGamesData } from '../../hooks/useGamesData';

export const GamesList = ({ category, heading, page }) => {
  const { games } = useGamesData(category, page);
  const resultsCount = games?.length ?? 40;

  const showHeading = category !== 'all' || (category === 'all' && page < 2);

  return (
    <section>
      {showHeading && <h1 className={classes.header}>{heading}</h1>}
      <div className={classes['game-cards']}>
        {[...Array(resultsCount)].map((_, id) => (
          <GameCard category={category} page={page} key={id} id={id} />
        ))}
      </div>
    </section>
  );
};
