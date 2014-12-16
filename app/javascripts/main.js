'use strict';

var fb = require('firebase');

var React = require('react'),
    Router = require('react-router'),
    { Route, RouteHandler, Link } = Router,
    Task = require('./components/task'),
    Tasks = require('./components/tasks'),
    Login = require('./components/login'),
    Logout = require('./components/logout'),
    auth = require('./components/auth').auth,
    Authentication = require('./components/auth').Authentication;

var App = React.createClass({
  mixins: [
    Router.State,
  ],

  getInitialState: function () {
    return {
      loggedIn: false,
      fbRef: this.props.fbRef
    };
  },

  componentWillMount: function () {
    this.state.fbRef.onAuth(function(auth) {
      var loggedIn = auth != null;
      this.setState({
        loggedIn: loggedIn,
        loggedInAs: loggedIn ? auth.github.displayName : null
      });
    }, this);
  },

  render: function () {
    var loginOrOut = this.state.loggedIn ?
      <Link to="logout">Logged in as {this.state.loggedInAs} (Sign out)</Link> :
      <Link to="login">Sign in</Link>;
    return (
      <div>
        <ul>
          <li>{loginOrOut}</li>
          <li><Link to="tasks">Tasks</Link></li>
        </ul>
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
  </Route>
);

Router.run(routes, function (Handler) {
  var fbRef = new fb("https://jkilla.firebaseio.com/");
  React.render(<Handler fbRef={fbRef} />, document.getElementById('app'));
});
