import React from 'react';

const FormInput = ({ label, type, id }) => {
    return (
        <div className="input-wrapper">
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} />
        </div>
    );
}

export default FormInput;
