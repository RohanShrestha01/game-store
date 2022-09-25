export const getGames = async url => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Response('', {
      statusText: 'Failed to fetch games data.',
      status: response.status,
    });
  }
  const gamesData = await response.json();

  const gamesArr = gamesData.results.map(game => ({
    id: game.id,
    name: game.name,
    slug: game.slug,
    bgImage: game.background_image,
    genres: game.genres,
    clips: game.clip?.clips,
    metacriticScore: game.metacritic,
    rating: game.rating,
    ratings: game.ratings,
    released: game.released,
    platforms: game.parent_platforms,
    playtime: game.playtime,
    screenshots: game.short_screenshots,
    stores: game.stores,
    updated: game.updated,
  }));

  return gamesArr;
};
