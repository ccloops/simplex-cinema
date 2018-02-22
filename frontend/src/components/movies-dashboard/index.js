import './_movies-dashboard.scss';
import React, { Component } from 'react';
import SidebarNav from '../sidebar-nav';
import MoviesDisplay from '../movies-display';

class MoviesDashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main className='movies-dashboard'>
        <SidebarNav />
        <MoviesDisplay />
      </main>
    );
  }
}

export default MoviesDashboard;
