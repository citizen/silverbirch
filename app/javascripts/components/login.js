'use strict';

var React = require('react'),
    Router = require('react-router');

var Login = React.createClass({
  mixins: [
    Router.Navigation
  ],

  statics: {
    attemptedTransition: null
  },

  handleSubmit: function (event) {
    event.preventDefault();

    this.props.fbRef.authWithOAuthPopup("github", function(err, authData) {
      if (err) {
        console.warn('error: ', err);
      } else if (authData) {
        this.createUser(authData);
      }
    }.bind(this));
  },

  createUser: function (userData) {
    var username = userData.github.username,
        usersRef = this.props.fbRef.child("users");

    usersRef.child(username).transaction(function(userExists) {
      if (!userExists) {
        // TODO: use switch case to allow for more auth providers
        if(userData.provider === 'github') {
          var githubUser = userData.github;
          userData.email        = githubUser.email;
          userData.avatar       = githubUser.cachedUserProfile.avatar_url;
          userData.username     = username;
          userData.displayName  = githubUser.displayName;
          return userData;
        }
      }
    }, function(error, committed) {
      this.userCreated(username, committed);
    }.bind(this));
  },

  userCreated: function (username, exists) {
    if (!exists) {
      console.info('user ' + username + ' already exists!');
    } else {
      console.info('Successfully created ' + username);
    }
    this.replaceWith('/tasks');
  },

  render: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <button>Log in</button>
      </form>
    );
  }
});

module.exports = Login;
