import { useState, useEffect } from "react";

const UseFetch = (apiPath, queryTerm = "") => {
  const [data, setData] = useState([]); // Default to an empty array
  const [error, setError] = useState(null);
  const key = import.meta.env.VITE_API_KEY;
  const url = `https://api.themoviedb.org/3/${apiPath}?api_key=${key}&query=${queryTerm}`;

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();

        // Extract 'results' or set as an empty array if missing
        setData(jsonData.results || []);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchMovies();
  }, [url]);

  return { data, error }; // Include error for debugging
};

export default UseFetch;
