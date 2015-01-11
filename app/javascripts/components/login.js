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
          userData.username     = username;
          userData.email        = (githubUser.email) ? githubUser.email : null;
          userData.avatar       = (githubUser.cachedUserProfile.avatar_url) ? githubUser.cachedUserProfile.avatar_url : null;
          userData.displayName  = (githubUser.displayName) ? githubUser.displayName : null;
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
      <div onClick={this.handleSubmit}>
        <h3>Log in with...</h3>
        <span className="btn btn-default">Github</span>
      </div>
    );
  }
});

module.exports = Login;
