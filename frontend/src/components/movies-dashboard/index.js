import './_movies-dashboard.scss';
import React, { Component } from 'react';
import MoviesNav from '../movies-nav';
import Movies from '../movies';

class MoviesDashboard extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <main className='movies-dashboard'>
        <MoviesNav />
        <Movies />
      </main>
    );
  }
}

export default MoviesDashboard;
