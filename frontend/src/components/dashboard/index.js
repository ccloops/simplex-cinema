import './_dashboard.scss';
import React from 'react';
import superagent from 'superagent';
import { connect } from 'react-redux';

import HeaderBar from '../header-bar';
import * as routes from '../../routes';
import MoviesDashboard from '../movies-dashboard';
import { getActionRequest } from '../../action/client-movies';

class Dashboard extends React.Component {
  componentWillMount() {
    this.props.setMoviesToStore();
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

const mapStateToProps = state => ({
  movies: state.clientMovies,
});

const mapDispatchToProps = dispatch => ({
  setMoviesToStore: movies => dispatch(getActionRequest(movies)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
