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
    var uid = userData.auth.uid,
        dbRef = this.props.fbRef;

    dbRef.child(uid).transaction(function(userExists) {
      if (!userExists) {
        // TODO: use switch case to allow for more auth providers
        if(userData.provider === 'github') {
          var githubUser = userData.github,
              sbId = 'sb:' + githubUser.username;

          userData.sbid         = sbId;
          userData.email        = (githubUser.email) ? githubUser.email : null;
          userData.avatar       = (githubUser.cachedUserProfile.avatar_url) ? githubUser.cachedUserProfile.avatar_url : null;
          userData.is_type      = 'auth_provider';
          userData.username     = githubUser.username;
          userData.is_viewing   = sbId;
          userData.displayName  = (githubUser.displayName) ? githubUser.displayName : null;

	  // TODO: guarentee ordering through callbacks
          dbRef.child(sbId).set(userData);
          return {belongs_to_user: sbId};
        }
      }
    }, function(error, committed) {
      this.userCreated(userData.username, committed);
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
