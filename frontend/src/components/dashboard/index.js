import './_dashboard.scss';
import React from 'react';

import HeaderNav from '../header-nav';
import Movies from '../movies';

class Dashboard extends React.Component {
  render(){
    return (
      <div className='dashboard'>
        <HeaderNav />
        <Movies />
      </div>
    );
  }
}

export default Dashboard;
