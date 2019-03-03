import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'
import { validateFields, validateForm } from "../../utils";
import FormError from '../FormError/FormError'
import FormField from '../FormField/FormField'

export default class SignUp extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    errors: {},
    serverError: '',
    isSubmitting: false,
    signedUp: false,
  };

  handleChange = ({ target: { name, value } }) => {
    if (this.state.errors[name]) {
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
    const { username, password, email, firstName, lastName } = this.state;
    const errors = validateFields({ username, password, email, firstName, lastName }, "signUp");
    if (validateForm(errors)) {
      api.signUp({ username, password, email, firstName, lastName })
        .then(() => this.setState({
          signedUp: true,
        }))
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
    const { errors, serverError, isSubmitting, signedUp } = this.state;
    if (signedUp) return (
      <div className="success-block">
        <span>Your account has been successfully created! <Link to="/" className="form-link">Sign In</Link></span>
      </div>
    );
    return (
      <div>
        <h1 className="title">Sign Up</h1>
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
            type="text"
            placeholder="Email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            error={errors.email}
          />
          <FormField
            type="text"
            placeholder="First Name"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
            error={errors.firstName}
          />
          <FormField
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
            error={errors.lastName}
          />
          <FormField
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            error={errors.password}
          />
          <button type="submit" className="submit-button" disabled={isSubmitting}>Sign Up</button>
        </form>
        <span>Already have an account? <Link to="/" className="form-link">Sign In</Link></span>
      </div>
    )
  }
}
