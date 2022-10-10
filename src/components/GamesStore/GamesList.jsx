import classes from './GamesList.module.css';

import { GameCard } from './GameCard';
import { useGamesData } from '../../hooks/useGamesData';

export const GamesList = ({ category, heading, page, searchQuery = null }) => {
  const { games } = useGamesData(category, page, searchQuery);
  const resultsCount = games?.length ?? 40;

  const showHeading = category !== 'all' || (category === 'all' && page < 2);

  if (resultsCount === 0)
    return (
      <div style={{ textAlign: 'center', lineHeight: '3.5rem' }}>
        <h2>No Results Found</h2>
        <p>Try Searching Another Game</p>
      </div>
    );

  return (
    <section>
      {showHeading && <h1 className={classes.header}>{heading}</h1>}
      <div className={classes['game-cards']}>
        {[...Array(resultsCount)].map((_, id) => (
          <GameCard
            category={category}
            page={page}
            key={id}
            id={id}
            searchQuery={searchQuery}
          />
        ))}
      </div>
    </section>
  );
};
