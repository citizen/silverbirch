'use strict';

var fb = require('firebase'),
    React = require('react'),
    Router = require('react-router'),
    { Route, RouteHandler, Link, NotFoundRoute } = Router,
    config = require('./config'),
    Task = require('./components/task'),
    Menu = require('./components/menu'),
    Tasks = require('./components/tasks'),
    Login = require('./components/login'),
    Logout = require('./components/logout'),
    Profile = require('./components/profile'),
    AddTask = require('./components/task-form-add'),
    EditTask = require('./components/task-form-edit');

var App = React.createClass({
  mixins: [
    Router.State
  ],

  getInitialState: function () {
    return {
      user: null
    };
  },

  componentWillMount: function () {
    this.props.fbRef.onAuth(function(auth) {
      if(auth) {
        var dbRef = this.props.fbRef;
        dbRef.child(auth.uid).once('value', function(authData) {
          dbRef.child(authData.val().belongs_to_user).on('value', this.setUser);
        }.bind(this));
      }
      else {
        this.setUser(auth);
      }
    }, this);
  },

  setUser: function (userData) {
    this.setState({
      user: userData ? userData.val() : null
    });
    this.forceUpdate();
  },

  render: function () {
    var loginOrOut, profileLink;

    profileLink = (this.state.user) ?
      <li>
        <Link to="profile" params={{username: this.state.user.username}}>
          <img className="avatar" src={this.state.user.avatar} />
          <span>{this.state.user.username}</span>
        </Link>
      </li> : '';

    loginOrOut = (this.state.user) ?
      <Link to="logout">Sign out</Link> :
      <Link to="login">Sign in</Link>;

    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="tasks" className="navbar-brand">
                <img src="data:image/png;base64,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" />
                <span>SilverBirch</span>
              </Link>
            </div>

            <ul className="nav navbar-nav">
              <li><Link to="tasks">Tasks</Link></li>
            </ul>

            <ul className="nav navbar-nav navbar-right">
              {profileLink}
              <li>{loginOrOut}</li>
            </ul>
          </div>
        </nav>
        <Menu position="left" />
        <Menu position="right" />
        <RouteHandler user={this.state.user} {...this.props}/>
      </div>
    );
  }
});

var TaskNotFound = React.createClass({
  mixins: [
    Router.Navigation
  ],

  componentWillMount: function () {
    this.transitionTo('tasks');
  },

  render: function () {
    return false;
  }
});

var routes = (
  <Route handler={App}>
    <Route name="login" handler={Login}/>
    <Route name="logout" handler={Logout}/>
    <Route name="tasks" handler={Tasks}>
      <Route name="newTask" path="new" handler={AddTask}/>
      <Route name="task" path=":taskId" handler={Task}/>
      <Route name="newChildTask" path=":taskId/new" handler={AddTask}/>
      <Route name="editTask" path=":taskId/edit" handler={EditTask}/>
      <NotFoundRoute handler={TaskNotFound} />
    </Route>
    <Route name="profile" path="profile/:username" handler={Profile}/>
  </Route>
);

Router.run(routes, function (Handler) {
  var fbRef = new fb(config.db);
  React.render(<Handler fbRef={fbRef} />, document.getElementById('app'));
});
