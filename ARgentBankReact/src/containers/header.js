import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import logo from '../img/argentBankLogo.png';
import { logout } from '../features/auth/authSlice'; 
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn); 
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const handleLogout = () => {
        dispatch(logout()); 
        navigate('/sign-in'); 
    }

    return (
        <nav className="main-nav">
            <Link to="/" className="main-nav-logo">
                <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {isLoggedIn ? (
                    <a onClick={handleLogout} className="main-nav-item"> 
                        <FontAwesomeIcon icon={faUserCircle} />
                        Sign Out
                    </a>
                ) : (
                    <Link to="/sign-in" className="main-nav-item">
                        <FontAwesomeIcon icon={faUserCircle} />
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Header;
