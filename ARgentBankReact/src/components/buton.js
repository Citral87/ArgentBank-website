import React from 'react';

const Button = ({ children, onClick }) => {
    return (
        <button className="sign-in-button" onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
