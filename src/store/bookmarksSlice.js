import { createSlice } from '@reduxjs/toolkit';

const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

const initialState = bookmarks ?? {
  bookmarkedItems: [],
  bookmarkedItemsPrices: [],
};

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    add: (state, action) => {
      state.bookmarkedItems.push(action.payload.game);
      state.bookmarkedItemsPrices.push(action.payload.pricesList);
      localStorage.setItem('bookmarks', JSON.stringify(state));
    },
    remove: (state, action) => {
      const num = state.bookmarkedItems.findIndex(
        item => item.id === action.payload
      );
      state.bookmarkedItems.splice(num, 1);
      state.bookmarkedItemsPrices.splice(num, 1);
      localStorage.setItem('bookmarks', JSON.stringify(state));
    },
  },
});

export const bookmarksSliceActions = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
