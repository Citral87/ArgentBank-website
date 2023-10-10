import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/v1';


const apiService = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});


export const setAuthToken = (token) => {
  console.log('Setting auth token:', token);
  if (token) {
    apiService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiService.defaults.headers.common['Authorization'];
  }
};

export const loginUser = (email, password) => {
  return apiService.post('/user/login', { email, password });
};

export const signupUser = (email, password, firstName, lastName, userName) => {
  return apiService.post('/user/signup', { email, password, firstName, lastName, userName });
};

export const getUserProfile = () => {
  
  return apiService.post('/user/profile');
};

export const updateUserProfile = (userInfo) => {
  return apiService.put('/user/profile', userInfo);
};



export const fetchAccountTransactions = (accountId) => {
  return apiService.get(`/accounts/${accountId}/transactions`);
};




export default apiService;
