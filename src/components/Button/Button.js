import React from 'react';
import './Button.css';
const Button = ({ className, children, ...rest }) => {
    return (
        <button className={`button ${className}`} {...rest}>
            {children}
        </button>
    );
};

export default Button;