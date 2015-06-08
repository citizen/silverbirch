'use strict';

var React = require('react'),
    Router = require('react-router'),
    { Link } = Router;

var Header = React.createClass({
  render: function () {
    var userName,
      	teamsList,
        loginOrOut,
        profileLink,
      	teamsDropdown,
      	viewContextName;

    viewContextName = (this.props.viewContext) ?
      this.props.viewContext.properties.sbid.split(":")[1] : "";

    userName = (this.props.user) ? this.props.user.properties.username : "";

    profileLink = (this.props.user) ?
      <Link to="profile" params={{viewContext: this.props.user.properties.username}}>
        <span>Logged in as </span>
        <img className="avatar" src={this.props.user.properties.avatar} />
        <span>{this.props.user.properties.username}</span>
      </Link>
      : '';

    loginOrOut = (this.props.user) ?
      <Link to="logout">Sign out</Link> :
      <Link to="login">Sign in</Link>;

    teamsList = (this.props.user && this.props.user.properties.in_teams) ?
      Object.keys(this.props.user.properties.in_teams).map(function(team, index) {
        // TODO: request team data from DB for logo etc.
        var teamName = team.split(":")[1];

        return (
          <li key={index}>
            <Link to="tasks" params={{viewContext: teamName}}>
              <span>{teamName}</span>
            </Link>
          </li>
        )
      }) :
      "";

    teamsDropdown = (this.props.user && this.props.user.properties.in_teams) ?
      <li className="bootstrap-frm">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
          {viewContextName} <span className="caret"></span>
        </a>

        <li>
          <Link to="tasks" params={{viewContext: this.props.user.properties.username}}>
            <span>{this.props.user.properties.username}</span>
          </Link>
        </li>

        {teamsList}
      </li> :
      <li className="bootstrap-frm">
      	<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
          {userName} <span className="caret"></span>
        </a>
        <ul className="dropdown-menu" role="menu">
      	  <li>
      	    <Link to="tasks" params={{viewContext: userName}}>
      	      <span>{userName}</span>
      	    </Link>
      	  </li>
      	</ul>
      </li>;

    return (
      <div id="header-wrap">

        <nav className="">
          <div className="">
            <div className="header-left">
            <img src="/images/sb_logo.jpg" alt=""/>
              {teamsDropdown}
            </div>
            <div className="header-right">
              <Link to="tasks" params={{viewContext: viewContextName}}>Tasks</Link> |
              <Link to="report" params={{viewContext: viewContextName}}>Report</Link> |
              {profileLink}
              {loginOrOut}
            </div>
          </div>
        </nav>
      </div>
    );
  }
});

module.exports = Header;
