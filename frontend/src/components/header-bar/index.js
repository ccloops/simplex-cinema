import './_header-bar.scss';
import React, { Component } from 'react';

class HeaderNav extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <header className='header-bar'>
        <figure className='logo'>Simplex</figure>
        <h3 className='user-dropdown'>User</h3>
      </header>
    );
  }
}

export default HeaderNav;
