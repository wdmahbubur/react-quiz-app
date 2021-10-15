import React, { useMemo } from 'react';
import './Summery.css';

import successImg from '../../images/success.png';
import useFetch from '../../hooks/useFetch';

const Summery = ({ score, noq }) => {

    const getKeyword = useMemo(() => {
        if ((score / (noq * 5)) * 100 < 50) {
            return "failed";
        }
        else if ((score / (noq * 5)) * 100 < 75) {
            return "good";
        }
        else if ((score / (noq * 5)) * 100 < 100) {
            return "very good";
        }
        else {
            return "excellent";
        }
    }, [score, noq]);

    const url = `https://api.pexels.com/v1/search?query=${getKeyword}&per_page=1`;
    const method = "GET";
    const Authentication = process.env.REACT_APP_PIXELS_API_KEY;
    const { loading, error, result } = useFetch(url, method, {
        Authorization: Authentication
    });

    const image = result.photos ? result?.photos[0].src.medium : successImg;
    return (
        <div className="summary">
            <div className="point">
                <p className="score">
                    Your score is <br />
                    {score} out of {noq * 5}
                </p>
            </div>

            {loading && <div>Loading Your Badge...</div>}
            {error && <div>There was an error</div>}
            {!loading && !error && <>
                <div className="badge">
                    <img src={image} alt="Success" />
                </div>
            </>
            }
        </div>
    );
};

export default Summery;