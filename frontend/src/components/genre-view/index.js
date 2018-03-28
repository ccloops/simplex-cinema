import './_genre-view.scss';
import React from 'react';
import Movie from '../movie';
import { connect } from 'react-redux';
import { Player } from 'video-react';

const GenreView = ({ movies }) => {
  return (
    <div className='genre-view'>
      Genres
      {movies.map(movie => {
        return <Movie key={movie._id} movie={movie} />;
      })}
    </div>
  );
};

const mapStateToProps = state => ({
  movies: state.clientMovies,
});

export default connect(mapStateToProps, null)(GenreView);
