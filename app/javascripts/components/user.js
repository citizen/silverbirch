"use strict";

var React = require("react");

var User = React.createClass({
  getInitialState: function() {
    return {
      userName: ""
    };
  },

  componentWillReceiveProps: function() {
    this.getUser();
  },

  componentDidMount: function () {
    this.getUser();
  },

  getUser: function () {
    var usersRef = this.props.fbRef.child("users");

    usersRef.child(this.props.userId).on("value", function(userData) {
      this.setState({
        userName: userData.val().github.displayName
      });
    }.bind(this));
  },

  render: function() {
    return (
      <li>{this.state.userName}</li>
    );
  }
});

module.exports = User;
