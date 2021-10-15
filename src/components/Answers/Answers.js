import React from 'react';
import CheckBox from '../CheckBox/CheckBox';
import './Answers.css';

const Answers = ({ options, handleChange, input }) => {
    return (
        <div className="answers">
            {
                options.map((option, index) => input ?
                    <CheckBox
                        key={index}
                        className="answer"
                        text={option.title}
                        value={index}
                        checked={option.checked}
                        onChange={(e) => handleChange(e, index)} />
                    :
                    <CheckBox
                        key={index}
                        className={`answer ${option.correct ? "correct" : option.checked ? "wrong" : null}`}
                        text={option.title}
                        defaultChecked={option.checked}
                        disabled />
                )
            }
        </div>
    );
};

export default Answers;