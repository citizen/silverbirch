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
	this.login(authData);
      }
    }.bind(this));
  },

  login: function (userData) {
    var uid = userData.auth.uid,
        dbRef = this.props.fbRef;

    dbRef.child('sb:' + userData[userData.provider].username).once('value', function(userSnapshot) {
      if ( !userSnapshot.val() ) {
	this.createUser(dbRef, userData);
      } else {
	this.replaceWith('tasks', {
	  viewContext: userSnapshot.val().properties.username
	});
      }
    }.bind(this), this.createUser(dbRef, userData));
  },

  createUser: function (dbRef, userData) {
    var userObj = {
	  properties: {},
	  relationships: {}
	},
	authObj = {
	  properties: {},
	  relationships: {}
	},
	githubUser = userData.github,
	sbId = 'sb:' + githubUser.username;

    userObj.properties.is_type      = 'user';
    userObj.properties.sbid         = sbId;
    userObj.properties.email        = (githubUser.email) ? githubUser.email : null;
    userObj.properties.avatar       = (githubUser.cachedUserProfile.avatar_url) ? githubUser.cachedUserProfile.avatar_url : null;
    userObj.properties.username     = githubUser.username;
    userObj.properties.is_viewing   = sbId;
    userObj.properties.displayName  = (githubUser.displayName) ? githubUser.displayName : null;

    authObj.properties.is_type = "provider_id";
    authObj.relationships.belongs_to_user = sbId;

    dbRef.child(userData.auth.uid).set(authObj, function(error) {
      if (error) {
	console.log("failed to create provider object: ", error)
      } else {
	dbRef.child(sbId).set(userObj, function(error) {
          if (error) {
	    console.log("failed to create user object: ", error)
          } else {
	    this.userCreated(userObj.username, error);
          }
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
