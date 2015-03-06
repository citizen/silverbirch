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

    dbRef.child('sb:' + userData[userData.provider].username).once('value', function(userExists) {
      if( userExists.val() ) {
      	this.replaceWith('tasks', {viewContext: userExists.val().username});
      }
      else {
	      var githubUser = userData.github,
      		  sbId = 'sb:' + githubUser.username;

	      userData.sbid         = sbId;
	      userData.email        = (githubUser.email) ? githubUser.email : null;
	      userData.avatar       = (githubUser.cachedUserProfile.avatar_url) ? githubUser.cachedUserProfile.avatar_url : null;
	      userData.is_type      = 'user';
	      userData.username     = githubUser.username;
	      userData.is_viewing   = sbId;
	      userData.displayName  = (githubUser.displayName) ? githubUser.displayName : null;

      	dbRef.child(uid).set({belongs_to_user: sbId, is_type: "provider_id"}, function(error) {
  	      dbRef.child(sbId).set(userData, function(error) {
	          this.userCreated(userData.username, error);
          }.bind(this));
        }.bind(this));

      }
    }.bind(this));
  },

  userCreated: function (username, error) {
    if (error) {
      console.info('error creating' + username + ': ', error);
    } else {
      console.info('Successfully created ' + username);
    }
    this.replaceWith('tasks', {viewContext: username});
  },

  render: function () {
    return (
      <div onClick={this.handleSubmit}>
        <div className="row">
          <div className="panel col-md-6 col-md-offset-3">
            <div className="panel-heading">
              <h3 className="panel-title">Log in with...</h3>
            </div>
            <div className="well">
              <span className="btn btn-primary btn-lg btn-block">Github</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Login;
