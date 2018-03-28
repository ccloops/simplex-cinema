import React, { Component } from 'react';
import { connect } from 'react-redux';

import GenreView from '../genre-view';
import AlphabeticalView from '../alphabetical-view';
import RatingView from '../rating-view';
import UploadView from '../upload-view';
import { createActionRequest } from '../../action/client-movies';

class MoviesDisplay extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    const { display } = this.props;

    let renderedView = null;

    switch (display) {
      case 'GENRE':
        renderedView = <GenreView />;
        break;
      case 'A-Z':
        renderedView = <AlphabeticalView />;
        break;
      case 'RATING':
        renderedView = <RatingView />;
        break;
      case 'UPLOAD':
        renderedView = <UploadView onComplete={this.props.createMovie}/>;
        break;
      default:
        renderedView = <GenreView />;

    }

    return (
      <section>
        {renderedView}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  display: state.display,
});

const mapDispatchToProps = dispatch => ({
  createMovie: movie => dispatch(createActionRequest(movie)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesDisplay);
