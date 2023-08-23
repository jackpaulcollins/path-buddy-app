import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: "Jack"
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null
    }
  }
})

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;