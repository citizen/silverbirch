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
    	return member !== 'undefined' && member !== team;
    });

    if (this.props.treeItem.relationships.has_assigned_members) {
      assignList = assignList.filter(function (assignee) {
        return !this.props.treeItem.relationships.has_assigned_members.hasOwnProperty(assignee);
      }.bind(this));
    };

    var dropdownList = assignList.map(function(member, index) {
      var memberName = member.replace(/sb:/, '');

      return (
        <a
          href="#"
          key={index}
          ref={member}
          onClick={this.assignMember}
        >{memberName}</a>
      )
    }.bind(this));

    return (
      <div className="dropdown active">

      	{dropdownList}
      </div>
    )
  }
});

module.exports = AssignDropdown;
