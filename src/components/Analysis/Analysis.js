import React from 'react';
import Questions from '../Questions/Questions';
import './Analysis.css';

const Analysis = ({ answers }) => {
    return (
        <div className="analysis">
            <h1>Question Analysis</h1>
            <Questions answers={answers}></Questions>
        </div>
    );
};

export default Analysis;