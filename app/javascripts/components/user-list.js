"use strict";

var React = require("react"),
    User = require("./user");

var UserList = React.createClass({
  render: function() {
    var dbRef = this.props.fbRef;
    var userNodes = this.props.users.map(function(user, index) {
      return (
        <User userId={user} key={index} fbRef={dbRef} />
      );
    });
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
