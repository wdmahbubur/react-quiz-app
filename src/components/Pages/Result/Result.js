import React from 'react';
import { useHistory, useParams } from 'react-router';
import useAnswers from '../../../hooks/useAnswers';
import Analysis from '../../Analysis/Analysis';
import Summery from '../../Summery/Summery';
import _ from 'lodash';
const Result = () => {
    const { videoId } = useParams();
    const { location } = useHistory();
    const { state } = location;
    const { qna } = state;

    const { loading, error, answers } = useAnswers(videoId);

    const calculate = () => {
        let score = 0;

        answers.forEach((question, index1) => {
            let correctIndexes = [], checkedIndexes = [];

            question.options.forEach((option, index2) => {
                if (option.correct) correctIndexes.push(index2);
                if (qna[index1].options[index2].checked) {
                    checkedIndexes.push(index2);
                    option.checked = true;
                }
            });
            if (_.isEqual(correctIndexes, checkedIndexes)) {
                score = score + 5;
            }
        });
        return score;

    }

    const userScore = calculate();
    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>There was an error!</div>}

            {answers && answers.length > 0 && <>
                <Summery score={userScore} noq={answers.length}></Summery>
                <Analysis answers={answers}></Analysis>
            </>
            }

        </>
    );
};

export default Result;