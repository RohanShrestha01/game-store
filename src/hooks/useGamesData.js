import { useQuery } from '@tanstack/react-query';
import { getGames, getPrices } from '../utils/api';

export const useGamesData = (category, page = 1) => {
  let url;
  if (category === 'featured')
    url = `https://api.rawg.io/api/games?dates=2020-01-01,2022-12-31&page=${page}&page_size=40&key=c542e67aec3a4340908f9de9e86038af`;
  else if (category === 'popular')
    url = `https://api.rawg.io/api/games?page=${page}&page_size=40&key=c542e67aec3a4340908f9de9e86038af`;
  else if (category === 'BOAT')
    url = `https://api.rawg.io/api/games/lists/popular?page_size=40&page=${page}&key=c542e67aec3a4340908f9de9e86038af`;
  else if (category === 'BOTY')
    url = `https://api.rawg.io/api/games/lists/greatest?ordering=-added&page=${page}&page_size=40&key=c542e67aec3a4340908f9de9e86038af`;
  else if (category === 'new')
    url = `https://api.rawg.io/api/games/lists/recent-games-past?ordering=-added&page_size=40&page=${page}&key=c542e67aec3a4340908f9de9e86038af`;
  else if (category === 'all')
    url = `https://api.rawg.io/api/games/lists/main?ordering=-released&page_size=40&page=${page}&key=c542e67aec3a4340908f9de9e86038af`;

  const {
    data,
    isLoading: gamesIsLoading,
    error: gamesError,
  } = useQuery(['games', category, page], () => getGames(url));

  const games = data?.results;
  const gamesCount = data?.count;

  const {
    data: pricesList,
    isLoading: pricesIsLoading,
    error: pricesError,
  } = useQuery(['prices', category, page], () => getPrices(games), {
    enabled: !!games,
  });

  return {
    games,
    gamesIsLoading,
    gamesError,
    pricesList,
    pricesIsLoading,
    pricesError,
    gamesCount,
  };
};
