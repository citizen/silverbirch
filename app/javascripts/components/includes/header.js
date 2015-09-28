'use strict';

var React = require('react'),
    Router = require('react-router'),
    { Link } = Router,
    TeamDropdown = require('./dropdown');

var Header = React.createClass({
  mixins: [
    Router.State
  ],

  getInitialState: function () {
    return {
      isVisible: false
    };
  },

  getViewContext: function () {
    if (this.props.user && this.props.user.properties.is_viewing) {
      return this.props.graph[this.props.user.properties.is_viewing];
    }

    return null;
  },

  toggleDropdown: function (e) {
    this.setState({
      isVisible: !this.state.isVisible
    });
  },

  render: function () {
    if (!this.props.user) {
      return false;
    }

    var userName,
      	teamsList,
        viewContext,
        menuDropdown,
      	teamsDropdown,
      	viewContextName;

    userName = (this.props.user) ? this.props.user.properties.username : "";

    viewContext = this.getViewContext();

    viewContextName = (viewContext && viewContext.hasOwnProperty('properties'))
			? viewContext.properties.sbid.split(":")[1]
			: "";

    menuDropdown = (this.state.isVisible) ?
      <div className="navigation-list">
        <Link to="tasks" params={{viewContext: viewContextName}}>Tasks</Link>
        <Link to="report" params={{viewContext: viewContextName}}>Report</Link>
        <Link to="newTeam">New Team</Link>
        <Link to="profile" params={{viewContext: this.props.user.properties.username}}>Profile</Link>
        <Link to="logout">Sign out</Link>
      </div> : null;

    return (
      <div className="navigation">
        <img className="header-avatar" onClick={this.toggleDropdown} src={this.props.user.properties.avatar} />
        {menuDropdown}

        <div className="header-left">
          <ul>
            <li>
              <TeamDropdown {...this.props}/>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = Header;
