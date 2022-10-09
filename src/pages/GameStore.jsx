import { Carousel } from '../components/GamesStore/Carousel';
import { GamesSlider } from '../components/GamesStore/GamesSlider';
import { GamesList } from '../components/GamesStore/GamesList';

export const sliderData = [
  ['Popular Games', 'popular'],
  ['Best of All Time', 'BOAT'],
  ['Best of the Year', 'BOTY'],
  ['New Releases', 'new'],
];

export const GameStore = () => {
  return (
    <>
      <Carousel />
      {sliderData.map(([heading, category], i) => (
        <GamesSlider heading={heading} category={category} key={i} />
      ))}
      <GamesList heading="All Games" category="all" page={1} />
    </>
  );
};
