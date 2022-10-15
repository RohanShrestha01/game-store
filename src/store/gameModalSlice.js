import { createSlice } from '@reduxjs/toolkit';

const initialState = { show: false, game: [], pricesList: [] };

const gameModalSlice = createSlice({
  name: 'gameModal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.show = true;
      state.game = action.payload.game;
      state.pricesList = action.payload.pricesList;
    },
    reset: () => initialState,
  },
});

export const gameModalActions = gameModalSlice.actions;

export default gameModalSlice.reducer;
