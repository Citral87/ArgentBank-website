import React from 'react';

const FormInput = React.forwardRef(({ label, type, id }, ref) => {
    return (
        <div className="input-wrapper">
            <label htmlFor={id}>{label}</label>
            <input ref={ref} type={type} id={id} />
        </div>
    );
});

export default FormInput;

