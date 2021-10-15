import React, { useEffect, useReducer, useState } from 'react';
import Answers from '../../Answers/Answers';
import ProgressBar from '../../ProgressBar/ProgressBar'
import MiniPlayer from '../../MiniPlayer/MiniPlayer';
import './Quiz.css';
import { useHistory, useParams } from 'react-router';
import useQuestions from '../../../hooks/useQuestions';
import _ from 'lodash';
import { useAuth } from '../../../hooks/useAuth';
import { getDatabase, ref, set } from '@firebase/database';

const initialState = 0;
const reducer = (state, action) => {
    switch (action.type) {
        case 'questions':
            action.value.forEach(question => {
                question.options.forEach(option => {
                    option.checked = false;
                });
            });
            return action.value;
        case 'answer':
            const questions = _.cloneDeep(state);
            questions[action.questionId].options[action.optionIndex].checked = action.value;
            return questions;
        default:
            return state;

    }
}

const Quiz = () => {
    const { user } = useAuth();
    const { videoId } = useParams();
    const { loading, error, questions } = useQuestions(videoId);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    let history = useHistory();

    const { location } = history;
    const { state } = location;
    const { videoTitle } = state;

    const [qna, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({
            type: "questions",
            value: questions
        })
    }, [questions])

    const handleAnswerChange = (e, index) => {
        dispatch({
            type: "answer",
            questionId: currentQuestion,
            optionIndex: index,
            value: e.target.checked,
        })
    }

    // handle when user clicks the next button to get the next question
    const nextQuestion = () => {
        if (currentQuestion <= questions.length) {
            setCurrentQuestion(prevCurrent => prevCurrent + 1);
        }
    }

    // handle when user clicks the previous button to get the previous question
    const previousQuestion = () => {
        if (currentQuestion >= 1 && currentQuestion <= questions.length) {
            setCurrentQuestion(prevCurrent => prevCurrent - 1);
        }
    }

    // calculate percentage of progress
    const percentage = questions.length > 0 ? ((currentQuestion + 1) / (questions.length) * 100) : 0;

    async function submitAnswer() {
        const { uid } = user;

        const db = getDatabase();
        const resultRef = ref(db, `result/${uid}`);

        await set(resultRef, {
            [videoId]: qna
        });
        history.push({
            pathname: `/result/${videoId}`,
            state: {
                qna,
            }
        });
    }
    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>There was an error</div>}
            {!loading && !error && qna.length > 0 && <>
                <h1>{qna[currentQuestion].title}</h1>
                <h4>Question can have multiple answers</h4>

                <Answers options={qna[currentQuestion].options} handleChange={handleAnswerChange} input></Answers>
                <ProgressBar next={nextQuestion} prev={previousQuestion} submit={submitAnswer} progress={percentage}></ProgressBar>
                <MiniPlayer videoId={videoId} title={videoTitle}></MiniPlayer>
            </>
            }
        </>
    );
};

export default Quiz;