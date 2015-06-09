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
        user = this.props.viewContext ? this.props.viewContext : {};

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


      <div className="grow"></div>



    );
  }
});

module.exports = Profile;
