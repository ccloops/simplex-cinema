import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  handleLogin(account) {
    this.props.doLogin();
    
  }

  render() {
    return (
      <div>
        <h1>Hi from landing</h1>
      </div>
    );
  }
}

export default Landing;
