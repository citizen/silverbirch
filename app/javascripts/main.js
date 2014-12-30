'use strict';

var fb = require('firebase'),
    React = require('react'),
    Router = require('react-router'),
    { Route, RouteHandler, Link } = Router,
    config = require('./config'),
    Task = require('./components/task'),
    Tasks = require('./components/tasks'),
    Login = require('./components/login'),
    Logout = require('./components/logout'),
    Profile = require('./components/profile');

var App = React.createClass({
  mixins: [
    Router.State
  ],

  getInitialState: function () {
    return {
      user: {},
      loggedIn: false,
      fbRef: this.props.fbRef
    };
  },

  componentWillMount: function () {
    this.state.fbRef.onAuth(function(auth) {
      var loggedIn = auth !== null;
      this.setState({
        loggedIn: loggedIn,
        user: loggedIn ? auth.github : null
      });
    }, this);
  },

  render: function () {
    var loginOrOut, profileLink;

    profileLink = (this.state.loggedIn) ?
      <li>
        <Link to="profile" params={{username: this.state.user.id}}>
          <img className="avatar" src={this.state.user.cachedUserProfile.avatar_url} />
          <span>{this.state.user.displayName}</span>
        </Link>
      </li> : '';

    loginOrOut = (this.state.loggedIn) ?
      <Link to="logout">Sign out</Link> :
      <Link to="login">Sign in</Link>;

    return (
      <div>
        <nav className="navbar navbar-default">
          <ul className="nav navbar-nav">
            <li><Link to="tasks">Tasks</Link></li>
            {profileLink}
            <li>{loginOrOut}</li>
          </ul>
        </nav>
        <RouteHandler {...this.props}/>
      </div>
    );
  }
});

var routes = (
  <Route handler={App}>
    <Route name="login" handler={Login}/>
    <Route name="logout" handler={Logout}/>
    <Route name="tasks" handler={Tasks}/>
    <Route name="task" path="tasks/:taskId" handler={Task}/>
    <Route name="profile" path="profile/:username" handler={Profile}/>
  </Route>
);

Router.run(routes, function (Handler) {
  var fbRef = new fb(config.db);
  React.render(<Handler fbRef={fbRef} />, document.getElementById('app'));
});
