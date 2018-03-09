import React from 'react';
import { Link } from 'react-router-dom';

const Movie = ({ movie }) => {
  return (
    <Link to={`/movie/${movie._id}`} movie={movie}>
      <img src={movie.posterURL} />
    </Link>
  );
};

export default Movie;
