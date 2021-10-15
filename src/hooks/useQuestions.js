import { useEffect, useState } from 'react';
import { getDatabase, ref, query, orderByKey, get } from "firebase/database";

const useQuestions = (videoId) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        async function fetchQuestion() {
            // connection database
            const db = getDatabase();
            const quizRef = ref(db, "quiz/" + videoId + "/questions");
            const quizQuery = query(
                quizRef,
                orderByKey()
            );
            try {
                setError(false);
                setLoading(true);
                // request firebase database
                const snapshot = await get(quizQuery);
                setLoading(false);
                if (snapshot.exists()) {
                    setQuestions((prevQuestions) => {
                        return [...prevQuestions, ...Object.values(snapshot.val())]
                    });
                }
            }
            catch (err) {
                console.log(err)
                setLoading(false);
                setError(true);
            }
        }
        fetchQuestion();
    }, [videoId])
    return {
        loading,
        error,
        questions,
    };
};

export default useQuestions;