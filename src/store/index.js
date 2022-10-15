import { configureStore } from '@reduxjs/toolkit';
import gameModalReducer from './gameModalSlice';

const store = configureStore({
  reducer: { gameModal: gameModalReducer },
});

export default store;
