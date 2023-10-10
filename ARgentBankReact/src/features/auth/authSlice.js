import { createSlice } from '@reduxjs/toolkit';
import { loginUser, updateUserProfile } from '../../apiservice';

const initialState = {
  isLoggedIn: false,
  userInfo: null,
  token: null,
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
      state.token = action.payload.body.token;  // Stock token 
      state.isLoading = false;
    },
    
    loginFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      localStorage.removeItem('token');  // Supprimez le token du localStorage ici
      state.isLoggedIn = false;
      state.userInfo = null;
      state.token = null;  // Réinitialisez le token dans l'état Redux ici
    },
    
    updateProfileStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action) => {
      state.userInfo = action.payload;
      state.isLoading = false;
    },
    updateProfileFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});


export const {
  loginStart,
  loginSuccess,
  loginFailed,
  logout,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailed,
} = authSlice.actions;

export const login = (email, password) => async (dispatch) => {

  dispatch(loginStart());

  try {
    const response = await loginUser(email, password);

    const userData = response.data;
    localStorage.setItem("token", userData.body.token)
    dispatch(loginSuccess(userData));
  } catch (error) {

    dispatch(loginFailed(error.response ? error.response.data : error.message));
  }
};



export const updateProfile = (userInfo) => async (dispatch) => {
  dispatch(updateProfileStart());
  try {
    const response = await updateUserProfile(userInfo); 
    dispatch(updateProfileSuccess(response.data));
  } catch (error) {
    dispatch(updateProfileFailed(error.response ? error.response.data : error.message));
  }
};


export default authSlice.reducer;
