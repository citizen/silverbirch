'use strict';

var React = require('react');

var MemberDropdown = React.createClass({
  getInitialState: function () {
    return {
      allUsers: {}
    };
  },

  componentDidMount: function() {
    this.props.fbRef
      .child('all_users')
      .on('value', function(dataSnapshot) {
        this.setState({
          allUsers: dataSnapshot.val()
        });
      }.bind(this));
  },

  addMember: function(event) {
    event.preventDefault();

    var dbRef = this.props.fbRef,
        team = this.props.viewContext.key,
        user = event.target.dataset.user;

    dbRef.child(user + '/relationships/in_teams/' + team).set(true, function (err) {
      if (err) {
        console.warn(err);
      };
    });

    dbRef.child(team + '/relationships/has_users/' + user).set(true, function (err) {
      if (err) {
        console.warn(err);
      };
    });
  },

  filterUsers: function(user) {
    return !this.props.members.hasOwnProperty(user);
  },

  displayUsers: function(user) {
    return (
      <a
        href="#"
        key={user}
        data-user={user}
        onClick={this.addMember}
      >{this.state.allUsers[user]}</a>
    )
  },

  render: function() {
    var dropdownList = Object.keys(this.state.allUsers)
                          .filter(this.filterUsers)
                          .map(this.displayUsers);

    return (
      <div className="dropdown active">
      	{dropdownList}
      </div>
    )
  }
});

module.exports = MemberDropdown;
