'use strict';

var _ = require('lodash'),
    React = require('react'),
    Router = require('react-router');

var Profile = React.createClass({
  mixins: [
    Router.State
  ],

  getInitialState: function() {
    return {
      user: {}
    };
  },

  componentWillMount: function() {
    this.getUser();
  },

  componentWillReceiveProps: function() {
    this.getUser();
  },

  getUser: function() {
    var dbRef = this.props.fbRef,
        userId = 'github:' + this.getParams().username,
        usersRef = dbRef.child("users").child(userId);

    usersRef.on('value', function(taskSnapshot) {
      var userData = taskSnapshot.val();

      this.setState({
        user: {
          email: userData.github.email,
          avatar: userData.github.cachedUserProfile.avatar_url,
          username: userData.github.username,
          displayName: userData.github.displayName,
        }
      });
    }.bind(this));
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
