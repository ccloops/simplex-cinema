import React from 'react';
import { connect } from 'react-redux';

const GenreView = ({ movies }) => {
  return (
    <div>
      Genres
      {movies.map(movie => {
        console.log(movie);
        <img src={movie.movieURL} />;
      })}
    </div>
  );
};

const mapStateToProps = state => ({
  movies: state.clientMovies,
});

export default connect(mapStateToProps, null)(GenreView);
