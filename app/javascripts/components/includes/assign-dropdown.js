'use strict';

var React = require('react');

var AssignDropdown = React.createClass({
  assignMember: function (event) {
    event.preventDefault();
    var sbMember = 'sb:' + event.currentTarget.innerHTML;

    this.props.fbRef.child(this.props.treeItem.key + '/relationships/has_assigned_members/' + sbMember).set(true);
  },

  render: function() {
    if (!this.props.user && this.props.graph) {
      return false;
    }

    var team = Object.keys(this.props.treeItem.relationships.has_users)[0];
    var teamMembers = Object.keys(this.props.graph[team].relationships.has_users);

    var assignList = teamMembers.filter(function (member) {
      if (
	member !== 'undefined' &&
	member !== team &&
	this.props.treeItem.relationships.has_assigned_members &&
	!this.props.treeItem.relationships.has_assigned_members.hasOwnProperty(member)
      ) {
	return member;
      }
    }.bind(this));

    var dropdownList = assignList.map(function(member, index) {
      var memberName = member.replace(/sb:/, '');

      return (
	<span key={index} ref={member} onClick={this.assignMember}>{memberName}</span>
      )
    }.bind(this));

    return (
      <div className="dropdown">
	{dropdownList}
      </div>
    )
  }
});

module.exports = AssignDropdown;
