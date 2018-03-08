import './_genre-view.scss';
import React from 'react';
import { connect } from 'react-redux';
import { Player } from 'video-react';

const GenreView = ({ movies }) => {
  return (
    <div>
      Genres
      <Player
        playsInline
        poster='https://s3-us-west-2.amazonaws.com/simplex-cinema/6524a5c913bf8e862d967ce0a8b45670.black-panther-poster.jpeg'
        src='https://s3-us-west-2.amazonaws.com/simplex-cinema/2fbf3ca371a7dbeef7dac3efcab72d9b.black-panther-trailer.mov'
      />
    </div>
  );
};

const mapStateToProps = state => ({
  movies: state.clientMovies,
});

export default connect(mapStateToProps, null)(GenreView);
