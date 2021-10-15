import { useEffect, useState } from 'react';
import { getDatabase, ref, query, orderByKey, get } from "firebase/database";

const useAnswers = (videoId) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [answers, setAnswers] = useState([]);
    useEffect(() => {
        async function fetchAnswers() {
            // connection database
            const db = getDatabase();
            const answerRef = ref(db, "answers/" + videoId + "/questions");
            const answerQuery = query(
                answerRef,
                orderByKey()
            );
            try {
                setError(false);
                setLoading(true);
                // request firebase database
                const snapshot = await get(answerQuery);
                setLoading(false);
                if (snapshot.exists()) {
                    setAnswers((prevQuestions) => {
                        return [...prevQuestions, ...Object.values(snapshot.val())]
                    });
                }
            }
            catch (err) {
                console.log(err)
                setLoading(false);
                setError(true);
                fetchAnswers();
            }
        }
        fetchAnswers();
    }, [videoId])
    return {
        loading,
        error,
        answers,
    };
};

export default useAnswers;