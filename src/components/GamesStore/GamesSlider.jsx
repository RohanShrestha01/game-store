import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { ChevronLeftRounded, ChevronRightRounded } from '@mui/icons-material';
/* SwiperJS */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import classes from './GamesSlider.module.css';
import { GameCard } from './GameCard';
import { useGamesData } from '../../hooks/useGamesData';

export const GamesSlider = ({ heading, category }) => {
  const { games, gamesError } = useGamesData(category);
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);
  const [slideProgress, setSlideProgress] = useState(0);

  const resultsCount = games?.length ?? 40;

  if (gamesError) return;

  const breakpoints = {
    0: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 15,
    },
    600: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 15,
    },
    850: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 20,
    },
    1250: {
      slidesPerView: 5,
      slidesPerGroup: 5,
      spaceBetween: 30,
    },
  };

  return (
    <section className={classes['games-slider']}>
      <div className={classes['games-slider__heading']}>
        <Link to={category} className={classes['games-slider__link']}>
          <h1 className={classes.heading}>{heading}</h1>
          <ChevronRightRounded fontSize="medium" />
        </Link>
        <div>
          <IconButton
            color="primary"
            ref={node => setPrevEl(node)}
            disabled={slideProgress === 0}
            sx={{ '&.Mui-disabled': { color: 'grey.text' } }}
          >
            <ChevronLeftRounded fontSize="large" />
          </IconButton>
          <IconButton
            color="primary"
            ref={node => setNextEl(node)}
            disabled={slideProgress === 1}
            sx={{ '&.Mui-disabled': { color: 'grey.text' } }}
          >
            <ChevronRightRounded fontSize="large" />
          </IconButton>
        </div>
      </div>
      <Swiper
        className={classes['game-cards']}
        breakpoints={breakpoints}
        simulateTouch={false}
        modules={[Navigation]}
        navigation={{ prevEl, nextEl }}
        onSlideChange={e => setSlideProgress(e.progress)}
      >
        {[...Array(resultsCount)].map((_, i) => (
          <SwiperSlide key={i}>
            <GameCard category={category} id={i} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
