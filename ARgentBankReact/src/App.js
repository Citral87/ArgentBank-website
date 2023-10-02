import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store'; 
import Header from "./containers/header";
import Footer from "./containers/footer";
import Home from "./pages/home";
import SignIn from "./pages/sign-in";
import User from './pages/user'; 
import "./App.css";
import "../src/css/main.css";

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
