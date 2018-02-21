import './_header-nav.scss';
import React, { Component } from 'react';

class HeaderNav extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <nav className='header-nav'>
        <figure className='logo'>Simplex</figure>
        <h3 className='user-dropdown'>User</h3>
      </nav>
    );
  }
}

export default HeaderNav;
