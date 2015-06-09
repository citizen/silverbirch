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
      <div className="dropdown">



        <a href="#" >
          {viewContextName} <span className="caret"></span>
        </a>


          <Link to="tasks" params={{viewContext: this.props.user.properties.username}}>
            <span>{this.props.user.properties.username}</span>
          </Link>


        {teamsList}
      </div>

      :

      <div className="dropdown">
      	<a href="#">
          {userName} <span className="caret"></span>
        </a>


      	    <Link to="tasks" params={{viewContext: userName}}>
      	      <span>{userName}</span>
      	    </Link>


      </div>;

    return (


        <nav className="navigation">

            <div className="header-left">

              {teamsDropdown}
            </div>
            <div className="header-right">
            <ul>

              <li><Link to="tasks" params={{viewContext: viewContextName}}>Tasks</Link></li>
              <li><Link to="report" params={{viewContext: viewContextName}}>Report</Link></li>
              <li>{profileLink}</li>
              <li>{loginOrOut}</li>
              </ul>
            </div>

        </nav>

    );
  }
});

module.exports = Header;
