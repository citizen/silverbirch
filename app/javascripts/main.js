'use strict';

var fb = require('firebase'),
    React = require('react'),
    Router = require('react-router'),
    { Route, RouteHandler, Link, NotFoundRoute } = Router,
    config = require('./config'),
    Task = require('./components/task'),
    Tasks = require('./components/tasks'),
    Login = require('./components/login'),
    Logout = require('./components/logout'),
    Profile = require('./components/profile'),
    AddTask = require('./components/task-form-add'),
    EditTask = require('./components/task-form-edit'),
    ViewContext = require('./components/view-context');

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
        this.transitionTo('tasks', {viewContext: 'rpowis'});
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
    return (
      <RouteHandler user={this.state.user} {...this.props} />
    );
  }
});

var routes = (
  <Route handler={App}>
    <Route name="login" handler={Login}/>
    <Route name="logout" handler={Logout}/>
    <Route path=":viewContext" handler={ViewContext}>
      <Route name="tasks" handler={Tasks}>
        <Route name="newTask" path="new" handler={AddTask}/>
        <Route name="task" path=":taskId" handler={Task}/>
        <Route name="newChildTask" path=":taskId/new" handler={AddTask}/>
        <Route name="editTask" path=":taskId/edit" handler={EditTask}/>
      </Route>
      <Route name="profile" handler={Profile}/>
    </Route>
  </Route>
);

Router.run(routes, function (Handler) {
  var fbRef = new fb(config.db);
  React.render(<Handler fbRef={fbRef} />, document.getElementById('app'));
});
