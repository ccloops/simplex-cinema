import './_dashboard.scss';
import React from 'react';
import superagent from 'superagent';

import HeaderBar from '../header-bar';
import * as routes from '../../routes';
import MoviesDashboard from '../movies-dashboard';

class Dashboard extends React.Component {
  componentWillMount() {
    return superagent.get(`${__API_URL__}${routes.MOVIES_ROUTE}`)
      .then(response => response.body.data)
      .then(console.log);
  }

  render() {
    return (
      <div className='dashboard'>
        <HeaderBar />
        <MoviesDashboard />
      </div>
    );
  }
}

export default Dashboard;
