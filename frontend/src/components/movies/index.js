import React, { Component } from 'react';

class Movies extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <section>
        {this.props.category}
      </section>
    );
  }
}

export default Movies;
