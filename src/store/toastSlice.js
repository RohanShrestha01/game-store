import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
  name: 'toast',
  initialState: { show: false, active: null, array: [] },
  reducers: {
    addSuccessToast: (state, action) => {
      state.array.push({
        type: 'success',
        message: action.payload,
      });
      toastSlice.caseReducers.setToast(state);
    },
    addInfoToast: (state, action) => {
      state.array.push({
        type: 'info',
        message: action.payload,
      });
      toastSlice.caseReducers.setToast(state);
    },
    setToast: state => {
      if (!state.active && state.array.length) {
        state.active = state.array[0];
        state.array.shift();
        state.show = true;
      } else {
        state.show = false;
      }
    },
    hideToast: state => {
      state.show = false;
    },
    resetActiveToast: state => {
      state.active = null;
      toastSlice.caseReducers.setToast(state);
    },
  },
});

export const toastSliceActions = toastSlice.actions;

export default toastSlice.reducer;
