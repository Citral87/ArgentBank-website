import React, { useEffect } from "react";  
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store'; 
import Header from "./containers/header";
import Footer from "./containers/footer";
import Home from "./pages/home";
import SignIn from "./pages/sign-in";
import User from './pages/user'; 
import "./App.css";
import "../src/css/main.css";
import { loginSuccess } from '../../ARgentBankReact/src/features/auth/authSlice';
import { PersistGate } from 'redux-persist/integration/react';




function App() {
  const dispatch = useDispatch();

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        dispatch(loginSuccess({ body: { token } }));
    }
  }, [dispatch]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/user" element={<User />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
