import React, { Component } from 'react';
import { connect } from 'react-redux';

class MoviesDisplay extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    const { display } = this.props;

    const genreJSX = <div>{display}</div>;
    const aToZJSX = <div>{display}</div>;
    const directorJSX = <div>{display}</div>;
    const ratingJSX = <div>{display}</div>;
    const uploadJSX = <div>{display}</div>;

    let renderedJSX = null;

    switch (display) {
      case 'GENRE':
        renderedJSX = genreJSX;
        break;
      case 'A-Z':
        renderedJSX = aToZJSX;
        break;
      case 'DIRECTOR':
        renderedJSX = directorJSX;
        break;
      case 'RATING':
        renderedJSX = ratingJSX;
        break;
      case 'UPLOAD':
        renderedJSX = genreJSX;
        break;
      default:
        renderedJSX = uploadJSX;

    }

    return (
      <section>
        {renderedJSX}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  display: state.display,
});

export default connect(mapStateToProps, null)(MoviesDisplay);
