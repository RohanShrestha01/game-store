export const getGames = async url => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch games data.');

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

export const getPrices = async games => {
  const chars = {
    '-': '',
    ':': '',
    "'": '5',
    '’': '',
    1: 'i',
    2: 'ii',
    3: 'iii',
    4: 'iv',
    5: 'v',
    6: 'vi',
    7: 'vii',
    8: 'viii',
    9: 'ix',
  };
  let plains = '';
  games.forEach(game => {
    plains =
      plains +
      game.name
        .replace(/[-:'’123456789]/g, c => chars[c])
        .replaceAll(' ', '')
        .toLowerCase() +
      ',';
  });

  const response = await fetch(
    `https://api.isthereanydeal.com/v01/game/prices/?key=${
      import.meta.env.VITE_ITAD_KEY
    }&plains=` + plains.slice(0, -1)
  );
  return response.json();
};
