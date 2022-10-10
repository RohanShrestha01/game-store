import { Carousel } from '../components/GamesStore/Carousel';
import { GamesSlider } from '../components/GamesStore/GamesSlider';
import { GamesList } from '../components/GamesStore/GamesList';
import { useState, useRef, useEffect } from 'react';

export const sliderData = [
  ['Popular Games', 'popular'],
  ['Best of All Time', 'BOAT'],
  ['Best of the Year', 'BOTY'],
  ['New Releases', 'new'],
];

export const GameStore = () => {
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  useEffect(() => {
    const obsOptions = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) setPage(prev => prev + 1);
    }, obsOptions);

    if (loader.current) observer.observe(loader.current);
  }, []);

  return (
    <>
      <Carousel />
      {sliderData.map(([heading, category], i) => (
        <GamesSlider heading={heading} category={category} key={i} />
      ))}
      {[...Array(page)].map((_, i) => (
        <GamesList heading="All Games" category="all" page={i + 1} key={i} />
      ))}
      <div ref={loader}></div>
    </>
  );
};
