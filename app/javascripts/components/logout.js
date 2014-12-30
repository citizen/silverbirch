'use strict';

var React = require('react');

var Logout = React.createClass({
  componentDidMount: function () {
    this.props.fbRef.unauth();
  },

  render: function () {
    return (
      <p>You are now logged out</p>
    );
  }
});

module.exports = Logout;
