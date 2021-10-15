import { useEffect, useState } from "react";

const useFetch = (url, method, headers) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [result, setResult] = useState([]);
    useEffect(() => {
        async function requestFetch() {
            try {
                setLoading(true);
                setError(false);
                const response = await fetch(url, {
                    method: method || "GET",
                    headers: headers
                });
                const data = await response.json();
                setResult(data);
                setLoading(false);
            }
            catch (err) {
                console.log(err);
                setError(true);
                setLoading(false);
            }
        }
        requestFetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return {
        loading,
        error,
        result
    }
}
export default useFetch;