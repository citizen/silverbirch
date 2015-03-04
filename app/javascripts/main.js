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
    Header = require('./includes/header'),
    Logout = require('./components/logout'),
    Profile = require('./components/profile'),
    AddTask = require('./components/task-form-add'),
    EditTask = require('./components/task-form-edit');

var App = React.createClass({
  mixins: [
    Router.State,
    Router.Navigation
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
          if( !authData.val() ) {
            this.setUser(false);
          }
          else {
            dbRef.child(authData.val().belongs_to_user).on('value', this.setUser);
          }
        }.bind(this));
      }
      else {
        this.setUser(auth);
        this.transitionTo('tasks');
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
    var leftMenuItems = [
      "SilverBirch",
      "WebOps"
    ];

    var rightMenuItems = [
      "rpowis",
      "jsuarez",
      "tommyvn",
      "chrisk2020",
      "anguspaterson"
    ];

    return (
      <div>
        <Header user={this.state.user} />
        <Menu position="left" title="Teams" menuItems={leftMenuItems} />
        <Menu position="right" title="Members" menuItems={rightMenuItems} />
        <RouteHandler user={this.state.user} {...this.props} />
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
