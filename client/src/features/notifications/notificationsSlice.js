/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notificatons',
  initialState: { message: null, icon: null },
  reducers: {
    setFlash: (state, action) => {
      const { message, icon, title } = action.payload;
      state.title = title;
      state.message = message;
      state.icon = icon;
    },
    clearFlash: (state) => {
      state.title = null;
      state.message = null;
      state.icon = null;
    },
  },
});

export const { setFlash, clearFlash } = notificationsSlice.actions;

export default notificationsSlice.reducer;

// eslint-disable-next-line max-len
export const selectCurrentFlashMessage = (state) => state.notifications;
