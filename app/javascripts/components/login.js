'use strict';

var React = require('react'),
    Router = require('react-router'),
    auth = require('./auth').auth,
    Authentication = require('./auth').Authentication;

var Login = React.createClass({
  mixins: [
    Router.Navigation
  ],

  statics: {
    attemptedTransition: null
  },

  componentWillMount: function () {
    this.db = new Firebase("https://jkilla.firebaseio.com");
  },

  handleSubmit: function (event) {
    event.preventDefault();

    this.db.authWithOAuthPopup("github", function(err, authData) {
      if (err) {
        console.warn('error: ', err);
      } else if (authData) {
        this.createUser(authData.uid, authData);
      }
    }.bind(this));
  },

  createUser: function (userId, userData) {
    var usersRef = this.db.child("/users");

    usersRef.child(userId).transaction(function(currentUserData) {
      if (currentUserData === null) {
        delete userData.auth;
        delete userData.token;
        delete userData.expires;
        delete userData[userData.provider].accessToken;
        return userData;
      }
    }, function(error, committed) {
      this.userCreated(userId, committed);
    }.bind(this));
  },

  userCreated: function (userId, success) {
    if (!success) {
      console.info('user ' + userId + ' already exists!');
    } else {
      console.info('Successfully created ' + userId);
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
