import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Noposter from "../assets/Noposter.png";

const MovieDetails = () => {
  const param = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await fetch(`https://api.tmdb.org/3/movie/${param.id}`, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`,
            accept: "application/json",
          },
        });
        const json = await response.json();
        setMovie(json);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }
    fetchMovie();
  }, [param.id]);

  useEffect(() => {
    if (movie.title) {
      document.title = `${movie.title} | CineComrade`;
    }
  }, [movie.title]);

  const image = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : Noposter;

  return (
    <main className="dark:bg-black min-h-screen">
      {/* FIXED: Removed min-h-screen from here and added py-10 for consistent padding without massive stretching */}
      <section className="flex flex-row justify-center items-center py-5  max-w-7xl mx-auto pl-10">
        <div className="max-w-sm">
          <img className="rounded w-3/4 mx-auto" src={image} alt={movie.title} />
        </div>
        <div className="max-w-2xl text-gray-700 text-lg dark:text-white p-2">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="my-5">{movie.overview}</p>
          
          <div className="my-3 flex flex-col gap-2">
            {movie.genres ? (
              <p className="my-2 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span className="border border-gray-200 rounded dark:border-gray-600 p-2 text-sm" key={genre.id}>
                    {genre.name}
                  </span>
                ))}
              </p>
            ) : ""}

            {/* RATING SYSTEM */}
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
              </svg>
              <p className="ms-2 text-sm font-bold dark:text-white">
                {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
              </p>
              <span className="w-1 h-1 mx-1.5 bg-gray-400 rounded-full"></span>
              <span className="text-sm font-medium dark:text-gray-400">
                {movie.vote_count ? `${movie.vote_count} reviews` : "0 reviews"}
              </span>
            </div>
          </div>
          
          <div className="flex flex-row mb-1 gap-2">
            <span className="font-bold dark:text-white">Runtime:</span>
            <span className="dark:text-white">{movie.runtime || 0} min</span>
          </div>
          <div className="flex flex-row mb-1 gap-2">
            <span className="font-bold dark:text-white">Budget:</span>
            <span className="dark:text-white">
              {movie.budget ? `$${movie.budget.toLocaleString()}` : "N/A"}
            </span>
          </div>
          <div className="flex flex-row mb-1 gap-2">
            <span className="font-bold dark:text-white">Revenue:</span>
            <span className="dark:text-white">
              {movie.revenue ? `$${movie.revenue.toLocaleString()}` : "N/A"}
            </span>
          </div>
          <div className="flex flex-row mb-1 gap-2">
            <span className="font-bold dark:text-white">Release Date:</span>
            <span className="dark:text-white">{movie.release_date || "N/A"}</span>
          </div>
          <div className="flex flex-row gap-2">
            <span className="font-bold dark:text-white">IMDB Code:</span>
            {movie.imdb_id ? (
              <a href={`https://www.imdb.com/title/${movie.imdb_id}`} className="text-blue-500 hover:underline dark:text-blue-400" target="_blank" rel="noreferrer">
                {movie.imdb_id}
              </a>
            ) : (
              <span className="dark:text-white">N/A</span>
            )}
          </div>
          
        </div>
      </section>
    </main>
  );
};

export default MovieDetails;