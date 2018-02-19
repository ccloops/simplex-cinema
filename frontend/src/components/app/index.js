import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from '../landing';
import AuthRedirect from '../auth-redirect';

const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
        <div>
          <Route path='*' component={ AuthRedirect } />
          <Route exact path='/' component={ Landing } />
          <Route exact path='/signup' component={ Landing } />
          <Route exact path='/login' component={ Landing } />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
