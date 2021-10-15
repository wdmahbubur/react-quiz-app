import React from 'react';
import './Illustration.css';

const Illustration = ({ src, alt, ...rest }) => {
    return (
        <div className="illustration">
            <img src={src} alt={alt} {...rest} />
        </div>
    );
};

export default Illustration;