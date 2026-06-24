import { useEffect, useState } from "react";

const useFetch = (apiPath,queryTerm = "",language = "",genre="") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const pages = [1, 2, 3, 4, 5];

        const requests = pages.map((page) => {
        let url = "";
        if (queryTerm) {
          url = `https://api.tmdb.org/3/search/movie?query=${queryTerm}&page=${page}`;
        }

        else if (language) {
          url = `https://api.tmdb.org/3/discover/movie?with_original_language=${language}&page=${page}`;
        }

        else if (genre) {
          url = `https://api.tmdb.org/3/discover/movie?with_genres=${genre}&page=${page}`;
        }

        else {
          url = `https://api.tmdb.org/3/movie/${apiPath}?language=en-US&page=${page}`;
        }
       
        return fetch(url, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`,
              accept: "application/json",
            },
          });
        });

        const responses = await Promise.all(requests);

        const results = await Promise.all(
          responses.map(async (response) => {
            if (!response.ok) {
              throw new Error(`HTTP Error: ${response.status}`);
            }

            return response.json();
          })
        );

        const allMovies = results.flatMap(
          (result) => result.results || []
        );

        const uniqueMovies = Array.from(
          new Map(
            allMovies.map((movie) => [movie.id, movie])
          ).values()
        );

        setData(uniqueMovies);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

  }, [apiPath, queryTerm, language, genre]);

  return { data, loading, error };
};

export default useFetch;