import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as routes from '../../routes';

const AuthRedirect = ({ location, history, token }) => {
  const { pathname }  = location;
  let destinationRoute = null;

  if (pathname === routes.LOGIN_ROUTE ||
      pathname === routes.SIGNUP_ROUTE ||
      pathname === routes.ROOT_ROUTE) {
    if (token) {
      destinationRoute = routes.DASHBOARD_ROUTE;
    }
  } else {
    destinationRoute = routes.DASHBOARD_ROUTE;
    // !!! uncomment later
    // if (!token) {
    //   destinationRoute = routes.ROOT_ROUTE;
    // }
  }

  return (
    <div className='auth-redirect'>
      { destinationRoute ? <Redirect to={destinationRoute} /> : undefined }
    </div>
  );
};

const mapStateToProps = state => ({
  token: state.token,
});

export default connect(mapStateToProps)(AuthRedirect);
