import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../../apiservice'; 

const initialState = {
  isLoggedIn: false,
  userInfo: null,
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
      state.isLoading = false;
    },
    loginFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    // logout
  },
});

export const { loginStart, loginSuccess, loginFailed } = authSlice.actions;


export const login = (email, password) => async (dispatch) => {
  console.log("login avec email:", email, "mot de passe:", password);  

  dispatch(loginStart());

  try {
      const response = await loginUser(email, password);
      const userData = response.data;

      console.log("Réponse de l'API:", response);  
      console.log("Données utilisateur:", userData);  

      dispatch(loginSuccess(userData));
  } catch (error) {
      console.error("Erreur lors de la connexion:", error);  

      dispatch(loginFailed(error.response ? error.response.data : error.message));
  }
};


export default authSlice.reducer;

