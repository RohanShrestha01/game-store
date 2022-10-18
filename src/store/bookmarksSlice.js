import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    },
    remove: (state, action) => {
      const num = state.bookmarkedItems.findIndex(
        item => item.id === action.payload
      );
      state.bookmarkedItems.splice(num, 1);
      state.bookmarkedItemsPrices.splice(num, 1);
    },
  },
});

export const bookmarksSliceActions = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
