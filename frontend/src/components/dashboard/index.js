import './_dashboard.scss';
import React from 'react';

import HeaderBar from '../header-bar';
import MoviesDashboard from '../movies-dashboard';

class Dashboard extends React.Component {
  render(){
    return (
      <div className='dashboard'>
        <HeaderBar />
        <MoviesDashboard />
      </div>
    );
  }
}

export default Dashboard;
