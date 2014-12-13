'use strict';

require('firebase');

var React = require('react'),
    Router = require('react-router'),
    { Route, RouteHandler, Link } = Router,
    ReactFireMixin  = require('reactfire'),
    Task = require('./components/task'),
    Tasks = require('./components/tasks'),
    Login = require('./components/login'),
    Logout = require('./components/logout'),
    auth = require('./components/auth').auth,
    Authentication = require('./components/auth').Authentication;

var App = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function () {
    return {
      loggedIn: auth.loggedIn()
    };
  },

  setStateOnAuth: function (loggedIn) {
    this.setState({
      loggedIn: loggedIn
    });
  },

  componentWillMount: function () {
    auth.onChange = this.setStateOnAuth;
    auth.login();
  },

  render: function () {
    var loginOrOut = auth.loggedIn() ?
      <Link to="logout">Sign out</Link> :
      <Link to="login">Sign in</Link>;
    return (
      <div>
        <ul>
          <li>{loginOrOut}</li>
          <li><Link to="tasks">Tasks</Link></li>
        </ul>
        <RouteHandler/>
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
  React.render(<Handler/>, document.getElementById('app'));
});
