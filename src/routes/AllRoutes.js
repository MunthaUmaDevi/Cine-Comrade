import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  MovieList,
  Search,
  PageNotFound,
  MovieDetails,
} from "../pages";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MovieList apiPath="now_playing" title="Home" />}/>
      <Route path="/movies/popular" element={<MovieList apiPath="popular" title="Popular" />}/>
      <Route path="/movies/top" element={<MovieList apiPath="top_rated" title="Top Rated" />}/>
      <Route path="/movies/upcoming" element={<MovieList apiPath="upcoming" title="Upcoming" />}/>

      {/* LANGUAGE ROUTES */}
      <Route path="/language/te" element={<MovieList language="te" title="Telugu Movies" />}/>
      <Route path="/language/hi" element={<MovieList language="hi" title="Hindi Movies" />}/>
      <Route path="/language/ta" element={<MovieList language="ta" title="Tamil Movies" />}/> 
      <Route path="/language/ml" element={<MovieList language="ml" title="Malayalam Movies" />}/>
      <Route path="/language/kn" element={<MovieList language="kn" title="Kannada Movies" />}/>
      <Route path="/language/en" element={<MovieList language="en" title="English Movies" />}/>
      
      
      {/* Genres */}
      <Route path="/genre/28" element={<MovieList genre="28" title="Action Movies"/>}/>
      <Route path="/genre/35" element={<MovieList genre="35" title="Comedy Movies" />}/>
      <Route path="/genre/18" element={<MovieList genre="18" title="Drama Movies" />}/>
      <Route path="/genre/27" element={<MovieList genre="27" title="Horror Movies"/>}/>
      <Route path="/genre/10749" element={<MovieList genre="10749" title="Romance Movies"/>}/>
      <Route path="/genre/878" element={<MovieList genre="878" title="Sci-Fi Movies"/>}/>

      
      
      <Route path="/search" element={<Search />}/>
      <Route path="/movie/:id" element={<MovieDetails />}/>
      <Route path="*" element={<PageNotFound title="Page Not Found" />}/>

    </Routes>
  );
};

export default AllRoutes;