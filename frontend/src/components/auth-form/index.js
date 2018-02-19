import React, { Component } from 'react';

class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onComplete(this.state);
    this.setState({
      username: '',
      email: '',
      password: '',
    });
  }

  render() {
    let { type } = this.props;

    type = type === 'login' ? type : 'signup';

    const signupJSX =
      <input
        name='email'
        placeholder='email'
        type='email'
        value={this.state.email}
        onChange={this.handleChange}
      />;

    let signupRenderedJSX = type !== 'login' ? signupJSX : undefined;

    return (
      <form className='auth-form' onSubmit={this.handleSubmit}>
        <input
          name='username'
          placeholder='username'
          type='text'
          value={this.state.username}
          onChange={this.handleChange}
        />

        {signupRenderedJSX}

        <input
          name='password'
          placeholder='password'
          type='password'
          value={this.state.password}
          onChange={this.handleChange}
        />

        <button type='submit'>{ type }</button>
      </form>
    );
  }
}

export default AuthForm;
