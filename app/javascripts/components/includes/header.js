'use strict';

var React = require('react'),
    Router = require('react-router'),
    { Link } = Router;

var Header = React.createClass({
  render: function () {
    var teamsList,
        loginOrOut,
        profileLink,
        teamsDropdown;

    profileLink = (this.props.user) ?
      <li className="navbar-text">
        {/*<Link to="profile" params={{viewContext: this.props.viewContext, username: this.props.user.username}}>*/}
          <span>Logged in as </span>
          <img className="avatar" src={this.props.user.avatar} />
          <span>{this.props.user.username}</span>
        {/*</Link>*/}
      </li> : '';

    loginOrOut = (this.props.user) ?
      <Link to="logout">Sign out</Link> :
      <Link to="login">Sign in</Link>;

    teamsList = (this.props.user && this.props.user.in_teams) ?
      Object.keys(this.props.user.in_teams).map(function(team, index) {
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

    teamsDropdown = (this.props.user && this.props.user.in_teams) ?
      <li className="dropdown">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{this.props.viewContext} <span className="caret"></span></a>
        <ul className="dropdown-menu" role="menu">
          <li>
            <Link to="tasks" params={{viewContext: this.props.user.username}}>
              <span>{this.props.user.username}</span>
            </Link>
          </li>
          {teamsList}
        </ul>
      </li> :
      <Link to="tasks" params={{viewContext: this.props.viewContext}}>
        <span>{this.props.viewContext}</span>
      </Link>;

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <ul className="nav navbar-nav">
            {teamsDropdown}
            <li><Link to="tasks" params={{viewContext: this.props.viewContext}}>Tasks</Link></li>
          </ul>

          <ul className="nav navbar-nav navbar-right">
            {profileLink}
            <li>{loginOrOut}</li>
          </ul>
        </div>
      </nav>
    );
  }
});

module.exports = Header;
