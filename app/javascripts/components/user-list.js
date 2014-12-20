"use strict";

var React = require("react"),
    User = require("./user");

var UserList = React.createClass({
  handleClick: function(userId) {
    this.props.removeUser(userId);
  },

  render: function() {
    var userNodes,
        dbRef = this.props.fbRef;

    userNodes = this.props.users.map(function(user, index) {
      var boundClick = this.handleClick.bind(this, user);
      return (
        <li key={index}>
          <User userId={user} key={index} fbRef={dbRef} />
          <span onClick={boundClick} className="btn btn-link btn-xs">x</span>
        </li>
      );
    }, this);

    return (
      <div className="userList">
        <h4>Users</h4>
        <ul>
          {userNodes}
        </ul>
      </div>
    );
  }
});

module.exports = UserList;
