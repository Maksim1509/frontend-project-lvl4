/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const modalSlices = createSlice({
  name: 'modal',
  initialState: {
    type: null,
    extra: null,
  },
  reducers: {
    modalClose: (state) => {
      state.type = null;
      state.extra = null;
    },
    modalOpen: (state, { payload }) => {
      state.type = payload.type;
      state.extra = payload.extra;
    },
  },
});

export const actions = { ...modalSlices.actions };
export default modalSlices.reducer;
