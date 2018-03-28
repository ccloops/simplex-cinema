import React, { Component } from 'react';
import { Player } from 'video-react';

import { getMovieById } from '../../lib/util';

class WatchMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: '',
    };
  }

  componentWillMount() {
    const movieId = this.props.match.params.movieId;

    return getMovieById(movieId)
      .then(response => response.body)
      .then(movie => {
        this.setState({ movie });
      });
  }

  render() {
    return (
      <div>
        <Player
          playsInline
          poster={this.state.movie.posterURL}
          src={this.state.movie.movieURL}
        />
      </div>
    );
  }
}

export default WatchMovie;
