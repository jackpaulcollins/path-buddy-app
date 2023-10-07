/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const pathStatsSlice = createSlice({
  name: 'pathStats',
  initialState: { date: null },
  reducers: {
    setDate: (state, action) => {
      const { date } = action.payload;
      state.date = date;
    },
  },
});

export const { setDate } = pathStatsSlice.actions;

export default pathStatsSlice.reducer;

// eslint-disable-next-line max-len
export const selectCurrentPathDate = (state) => state.pathStats.date;
