import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userInfo: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    },
    loginFailed: (state, action) => {
      state.error = action.payload;
    },
    // Ajoutez d'autres reducers si nécessaire (ex: logout)
  },
});

export const { loginSuccess, loginFailed } = authSlice.actions;
export default authSlice.reducer;
