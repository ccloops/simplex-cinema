import './_app.scss';
import React, { Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from '../landing';
import Dashboard from '../dashboard';
import WatchMovie from '../watch-movie';
import AuthRedirect from '../auth-redirect';

const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
        <Fragment>
          <Route path='*' component={ AuthRedirect } />
          <Route exact path='/' component={ Landing } />
          <Route exact path='/signup' component={ Landing } />
          <Route exact path='/login' component={ Landing } />
          <Route exact path='/movie/:movieId' component={ WatchMovie } />
          <Route exact path='/dashboard' component={ Dashboard } />
        </Fragment>
      </BrowserRouter>
    </div>
  );
};

export default App;
