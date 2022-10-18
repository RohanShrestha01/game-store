import { configureStore } from '@reduxjs/toolkit';
import gameModalReducer from './gameModalSlice';
import cartSliceReducer from './cartSlice';
import bookmarksSliceReducer from './bookmarksSlice';
import toastSliceReducer from './toastSlice';

const store = configureStore({
  reducer: {
    gameModal: gameModalReducer,
    cart: cartSliceReducer,
    bookmarks: bookmarksSliceReducer,
    toast: toastSliceReducer,
  },
});

export default store;
