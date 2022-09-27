import { useState, useEffect, useCallback } from 'react';

import classes from './Carousel.module.css';
import { CarouselSlider } from './CarouselSlider';
import { CarouselProgress } from './CarouselProgress';

export const Carousel = props => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prevActive => (prevActive !== 5 ? prevActive + 1 : 0));
    }, 6000);

    return () => clearInterval(interval);
  }, [active]);

  const carouselItemClickHandler = useCallback(id => {
    setActive(id);
  }, []);

  return (
    <section className={classes.carousel}>
      <CarouselSlider
        active={active}
        featuredGames={props.featured}
        isLoading={props.isLoading}
      />
      <CarouselProgress
        active={active}
        featuredGames={props.featured}
        carouselItemClickHandler={carouselItemClickHandler}
        isLoading={props.isLoading}
      />
    </section>
  );
};
