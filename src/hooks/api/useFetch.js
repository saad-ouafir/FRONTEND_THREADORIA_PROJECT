import { useEffect, useState } from "react";

export function useFetch(setAlert, fetchFunction, data) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setAlert(null);
        const response = await fetchFunction(data);
        setResult(response);
        // setAlert({ message: response.message || "Success", statusCode: response.status || 200 });
      } catch (error) {
        setResult(null);
        setAlert({ message: error.message || "Failed to fetch data", statusCode: error.status || 500 });
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [data, fetchFunction, setAlert]);

  return { ...result, loading };
}
