import React, { Component } from 'react'
import api from '../../api'
import loadingSpin from './loading.svg'

export default class Profile extends Component {
  state = {
    user: {},
    fetching: true,
  };

  componentDidMount() {
    api.getProfile()
      .then(response => this.setState({
        user: response.data,
        fetching: false,
      }), error => console.log(error));
  }

  handleClick = () => {
    api.logOut();
  };

  render() {
    const { user, fetching } = this.state;
    return (
      <div>
        <h1 className="title">Your profile</h1>
        <div className="profile-info">
          {fetching ? (
            <img src={loadingSpin} alt="Loading"/>
          ) : (
            <>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>Full name: {user.firstname + ' ' + user.lastname}</p>
            </>
          )}
          <button className="submit-button" onClick={this.handleClick}>Log out</button>
        </div>
      </div>
    )
  }
}
