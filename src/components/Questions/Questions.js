import React from 'react';
import Answers from '../Answers/Answers';
import './Questions.css';
const Question = ({ answers }) => {
    return answers.map((answer, index) => <div className="question" key={index}>
        <div className="qtitle">
            <span className="material-icons-outlined"> help_outline </span>
            {answer.title}
        </div>

        <Answers options={answer.options} input={false}></Answers>
    </div>
    );
}
export default Question;