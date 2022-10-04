import { Carousel } from '../components/Carousel';
import { GamesSlider } from '../components/GamesSlider';

export const GameStore = () => {
  const sliderData = [
    ['Popular Games', 'popular'],
    ['Best of All Time', 'BOAT'],
    ['Best of the Year', 'BOTY'],
    ['New Releases', 'new'],
  ];

  return (
    <>
      <Carousel />
      {sliderData.map(([heading, category], i) => (
        <GamesSlider heading={heading} category={category} key={i} />
      ))}
    </>
  );
};
