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
        username = this.getParams().username,
        usersRef = dbRef.child("users").child(username);

    console.log('username ' , username);

    usersRef.on('value', function(taskSnapshot) {
      var userData = {},
          userDataVal = taskSnapshot.val();
      console.log('userDataVal ' , userDataVal);

      userData.email = (userDataVal.email) ? userDataVal.email : '';
      userData.avatar = (userDataVal.avatar) ? userDataVal.avatar : '';
      userData.username = (userDataVal.username) ? userDataVal.username : '';
      userData.displayName = (userDataVal.displayName) ? userDataVal.displayName : '';

      this.setState({
        user: userData
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
