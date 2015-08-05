'use strict';

var React = require('react'),
    Router = require('react-router'),
    { Link } = Router;

var Dropdown = React.createClass({
  mixins: [
    Router.State
  ],

  render: function() {
    if (!this.props.user && this.props.graph) {
      return false;
    }

    var teamsList = [
      this.props.user
    ];

    var currentView = this.props.user.properties.is_viewing;

    if (this.props.user.relationships.in_teams) {
      var teams = this.props.user.relationships.in_teams;

      Object.keys(teams).forEach(function(team) {
	if (this.props.graph[team].properties) {
	  if (currentView === team) {
	    teamsList.unshift(this.props.graph[team]);
	  }
	  else {
	    teamsList.push(this.props.graph[team]);
	  }
	}
      }.bind(this));
    }

    var dropdownList = teamsList.map(function(team, index) {
      var teamUrl = team.properties.sbid.replace(/sb:/, '');

      return (
	<Link to="tasks" params={{viewContext: teamUrl}} key={index}>
	  <span>{team.properties.username}</span>
	</Link>
      )
    });

    return (
      <div className="dropdown">
	{dropdownList}
      </div>
    )
  }
});

module.exports = Dropdown;
