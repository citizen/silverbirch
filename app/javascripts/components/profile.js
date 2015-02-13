'use strict';

var _ = require('lodash'),
    React = require('react'),
    Router = require('react-router');

var Profile = React.createClass({
  mixins: [
    Router.State
  ],

  componentWillMount: function() {
    this.getUser();
  },

  componentWillReceiveProps: function() {
    this.getUser();
  },

  getUser: function() {
    var userData = {},
        user = this.props.user ? this.props.user : {};

    console.log('this.props ' , this.props);

    userData.email = (user.email) ? user.email : '';
    userData.avatar = (user.avatar) ? user.avatar : '';
    userData.username = (user.username) ? user.username : '';
    userData.displayName = (user.displayName) ? user.displayName : '';

    this.setState({
      user: userData
    });
  },

  render: function() {
    return (
      <div>
        <h2>Profile for {this.state.user.displayName}</h2>
        <img className="avatar avatar--big" src={this.state.user.avatar} />
        <h4>Username: {this.state.user.username}</h4>
        <h4>Email: {this.state.user.email}</h4>
      </div>
    );
  }
});

module.exports = Profile;
