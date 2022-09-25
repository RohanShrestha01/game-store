import { useQuery } from '@tanstack/react-query';

import { getGames } from '../utils/api';
import { Error } from './Error';
import { Carousel } from '../components/Carousel';

export const GameStore = () => {
  const featuredQuery = useQuery(['games', 'featured'], () =>
    getGames(
      `https://rawg.io/api/games/lists/greatest?ordering=-added&page_size=6&key=c542e67aec3a4340908f9de9e86038af`
    )
  );
  const gamesQuery = useQuery(['games'], () =>
    getGames(
      `https://rawg.io/api/games?dates=2020-01-01,2022-12-31&page=1&page_size=40&key=c542e67aec3a4340908f9de9e86038af`
    )
  );

  const isLoading = featuredQuery.isLoading || gamesQuery.isLoading;
  const error = featuredQuery.error ?? gamesQuery.error;

  if (error) return <Error error={error} />;

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Carousel featured={featuredQuery.data} />
      )}
    </>
  );
};
