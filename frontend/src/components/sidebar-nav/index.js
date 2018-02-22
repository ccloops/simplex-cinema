import './_sidebar-nav.scss';
import React, { Component } from 'react';
import DisplayCategories from '../display-categories';
import Upload from '../upload';

class SidebarNav extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <section className='sidebar-nav'>
        <DisplayCategories />
      </section>
    );
  }
}

export default SidebarNav;
