'use strict';

var React = require('react'),
    Router = require('react-router'),
    { Link } = Router,
    TeamDropdown = require('./dropdown');

var Header = React.createClass({
  mixins: [
    Router.State
  ],

  getViewContext: function () {
    if (this.props.user && this.props.user.properties.is_viewing) {
      return this.props.graph[this.props.user.properties.is_viewing];
    }

    return null;
  },

  render: function () {
    var userName,
      	teamsList,
        loginOrOut,
        viewContext,
      	profileLink,
      	teamsDropdown,
      	viewContextName;

    userName = (this.props.user) ? this.props.user.properties.username : "";

    viewContext = this.getViewContext();

    viewContextName = (viewContext && viewContext.hasOwnProperty('properties'))
			? viewContext.properties.sbid.split(":")[1]
			: "";

    profileLink = (this.props.user) ?
      <Link to="profile" params={{viewContext: this.props.user.properties.username}}>
        <img className="header-avatar" src={this.props.user.properties.avatar} />
        <span>{this.props.user.properties.username}</span>
      </Link>
      : '';

    loginOrOut = (this.props.user) ?
      <Link to="logout">Sign out</Link> :
      <Link to="login">Sign in</Link>;

    return (

<div className="navigation">

<div className=""></div>


<div className="navigation-list">
    <h5 className="">{profileLink}</h5>
    <Link to="tasks" params={{viewContext: viewContextName}}>Tasks</Link> |
    <Link to="report" params={{viewContext: viewContextName}}>Report</Link>

    <h5 className="">{loginOrOut}</h5>
    <Link to="newTeam"><span>New Team</span></Link>
</div>

<div className="header-left">
          <ul>
            <li>
              <a href="#">
                <TeamDropdown {...this.props}/>
              </a>
            </li>
          </ul>
</div>

</div>



    );
  }
});

module.exports = Header;
