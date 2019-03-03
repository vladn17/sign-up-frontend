import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'
import { validateFields, validateForm } from "../../utils";
import FormError from '../FormError/FormError'
import FormField from '../FormField/FormField'

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    errors: {},
    serverError: '',
    isSubmitting: false,
  };

  handleChange = ({ target: { name, value } }) => {
    if(this.state.errors[name]) {
      this.setState(state => ({
        [name]: value,
        errors: { ...state.errors, [name]: '' }
      }));
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      isSubmitting: true,
    });
    const { username, password } = this.state;
    const errors = validateFields({ username, password }, "signIn");
    if (validateForm(errors)) {
      api.login(this.state.username, this.state.password)
        .then(() => this.props.history.push('/profile'))
        .catch((error) => this.setState({
          serverError: error.error || 'Please try again',
          isSubmitting: false,
        }));
    } else {
      this.setState({
        errors: errors,
        isSubmitting: false,
      });
    }
  };

  render() {
    const { errors, serverError, isSubmitting } = this.state;
    return (
      <div>
        <h1 className="title">Sign In</h1>
        {serverError && (
          <FormError error={serverError}/>
        )}
        <form onSubmit={this.handleSubmit}>
          <FormField
            type="text"
            placeholder="Username"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            error={errors.username}
          />
          <FormField
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            error={errors.password}
          />
          <button type="submit" className="submit-button" disabled={isSubmitting}>Sign In</button>
        </form>
        <span>Don't have an account? <Link to="/signup" className="form-link">Sign Up</Link></span>
      </div>
    )
  }
}
