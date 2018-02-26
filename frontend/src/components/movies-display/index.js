import React, { Component } from 'react';
import { connect } from 'react-redux';

import GenreView from '../genre-view';
import AlphabeticalView from '../alphabetical-view';
import RatingView from '../rating-view';
import UploadView from '../upload-view';

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
        renderedView = <UploadView />;
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

export default connect(mapStateToProps, null)(MoviesDisplay);
