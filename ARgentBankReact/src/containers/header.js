import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOut } from "@fortawesome/free-solid-svg-icons";
import logo from "../img/argentBankLogo.png";
import { logout, setUserName } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector((state) => state.auth.userInfo?.userName);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/sign-in");
  };

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
      {isLoggedIn ? (
  <>
    <Link to="/user" className="user-link">
      <FontAwesomeIcon className="iconsignin" icon={faUserCircle} />
      <span className="username">{userName}</span>
    </Link>
    <FontAwesomeIcon className="iconsignout" icon={faSignOut} />
    <a onClick={handleLogout} className="main-nav-item">
      Sign Out
    </a>
  </>
) : (
          <Link to="/sign-in" className="main-nav-item">
            <FontAwesomeIcon className="iconsignin" icon={faUserCircle} />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
