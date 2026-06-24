import React from "react";
import Noposter from "../assets/Noposter.png";
import { Link } from "react-router-dom";

const Card = ({ movie }) => {
  if (!movie) return null;

  const {
    id,
    title,
    poster_path,
    vote_average
  } = movie;

  const image = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : Noposter;

  return (
    <Link
      to={`/movie/${id}`}
      className="group bg-black rounded-lg overflow-hidden border border-gray-800 hover:border-gray-500 transition-all duration-300 hover:scale-105"
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-[340px] object-cover"
        />

        <div className="absolute top-2 right-2 bg-black/80 text-yellow-400 px-2 py-1 rounded text-sm">
          ⭐ {vote_average?.toFixed(1)}
        </div>
      </div>

    </Link>
  );
};

export default Card;