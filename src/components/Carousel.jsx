import { useState, useEffect, useCallback } from 'react';

import classes from './Carousel.module.css';
import { CarouselSlider } from './CarouselSlider';
import { CarouselProgress } from './CarouselProgress';
import { useGamesData } from '../hooks/useGamesData';
import { Error } from '../pages/Error';

let activeCarousel = 0;

// array of 6 random numbers between 0 and 40 (0 included) for featured carousel
const randNums = [...Array(6)].map(
  function () {
    return this.splice(Math.floor(Math.random() * this.length), 1)[0];
  },
  [...Array(40).keys()]
);

export const Carousel = () => {
  const { games, gamesError, pricesList } = useGamesData('featured');
  const featured = games && randNums.map(num => games[num]);
  const prices = pricesList && randNums.map(num => pricesList[num]);

  const [active, setActive] = useState(activeCarousel);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prevActive => (prevActive !== 5 ? prevActive + 1 : 0));
      activeCarousel = activeCarousel !== 5 ? activeCarousel + 1 : 0;
    }, 7000);

    return () => clearInterval(interval);
  }, [active]);

  const carouselItemClickHandler = useCallback(id => {
    setActive(id);
    activeCarousel = id;
  }, []);

  if (gamesError) return <Error error={gamesError} />;

  return (
    <section className={classes.carousel}>
      <CarouselSlider active={active} featured={featured} prices={prices} />
      <CarouselProgress
        active={active}
        clickHandler={carouselItemClickHandler}
        featured={featured}
      />
    </section>
  );
};
