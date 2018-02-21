import './_movies-nav.scss';
import React, { Component } from 'react';
import MovieCategories from '../movie-categories';
import Upload from '../upload';

class MoviesNav extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <section className='movies-nav'>
        <MovieCategories />
        <Upload />
      </section>
    );
  }
}

export default MoviesNav;
