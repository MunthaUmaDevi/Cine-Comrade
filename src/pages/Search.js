import { useTitle } from "../hooks";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../components/Card";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const pageTitle = useTitle(`Search results for ${query}`);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  // Reset movie list and page number when a new search query is entered
  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (!query) return;

    async function fetchMovies() {
      try {
        page === 1 ? setLoading(true) : setLoadingMore(true);

        const response = await fetch(
          `https://api.tmdb.org/3/search/movie?query=${encodeURIComponent(
            query
          )}&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`,
              accept: "application/json",
            },
          }
        );
        
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        // Combine old and new movies into a Map keyed by movie.id to strip all duplicates
        setMovies((prev) => {
          const movieMap = new Map();
          
          // Add existing movies to the map
          prev.forEach((movie) => movieMap.set(movie.id, movie));
          
          // Add new incoming movies (will safely ignore/overwrite duplicates)
          const newResults = data.results || [];
          newResults.forEach((movie) => movieMap.set(movie.id, movie));
          
          // Convert the Map values back into a clean array
          return Array.from(movieMap.values());
        });

        setTotalPages(data.total_pages || 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    }

    fetchMovies();
  }, [query, page]);

  if (loading && page === 1) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black">
        <h2 className="text-center text-white text-2xl">Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black">
        <h2 className="text-center text-red-500 text-2xl">{error}</h2>
      </div>
    );
  }

  // Filter out any movies that do not have a poster path before rendering
  const filteredMovies = movies.filter((movie) => movie.poster_path);


  return (
    <main className="dark:bg-black min-h-screen">
      <section className="max-w-7xl mx-auto px-4">
       <div className = "py-2">
        {filteredMovies.length > 0 ? (

            <p className="text-black dark:text-white">
              Found {filteredMovies.length} movies for "{query}"
            </p>
      
        ) : (
          <>
            <h1 className="text-3xl font-bold py-4 text-black dark:text-white">
              No Results Found
            </h1>

            <p className="text-gray-400">
              We couldn't find any movies matching "{query}"
            </p>
          </>
        )}
      </div>

        {/* Movies Grid (Will be empty cleanly if no results exist) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredMovies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Load More Button System */}
        {page < totalPages && filteredMovies.length > 0 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={loadingMore}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition disabled:opacity-50"
            >
              {loadingMore ? "Loading..." : "Load More Movies"}
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Search;