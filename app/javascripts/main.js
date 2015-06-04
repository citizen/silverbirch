'use strict';

var fb = require('firebase'),
    React = require('react'),
    Router = require('react-router'),
    { Route, RouteHandler, Link, NotFoundRoute } = Router,
    config = require('./config'),
    //Task = require('./components/task'),
    Tasks = require('./components/tasks'),
    Login = require('./components/login'),
    Logout = require('./components/logout'),
    Profile = require('./components/profile'),
    AddTask = require('./components/task-form-add'),
    //EditTask = require('./components/task-form-edit'),
    SbFbGraph = require('./components/sbFbGraph'),
    ViewContext = require('./components/view-context');

var App = React.createClass({
  mixins: [
    Router.State,
    Router.Navigation
  ],

  getInitialState: function () {
    return {
      user: null,
      sbGraph: {}
    };
  },

  componentWillMount: function () {
    this.props.fbRef.onAuth(function (auth) {
      if(auth) {
        // user is logged in, sync graph
        this.sbFbGraph = new SbFbGraph(this.props.fbRef, auth.uid, this.processGraph);
        //var dbRef = this.props.fbRef;
        //dbRef.child(auth.uid).once('value', function(authData) {
        //  if( !authData.val() ) {
        //    this.setUser(false);
        //  }
        //  else {
        //    dbRef.child(authData.val().relationships.belongs_to_user).on('value', this.setUser);
        //  }
        //}.bind(this));
      }
      else {
        // user is logged out, maybe we should log in?
        this.transitionTo('login');
      }
    }, this);
  },

  processGraph: function (sbGraph, node) {
    switch (node.properties.is_type) {
      case 'task':
        console.log('Task node: ', node);
        break;
      case 'taskList':
        console.log('TaskList node: ', node);
        break;
      case 'user':
        console.log('User node: ', node);
        this.setUser(node);
        break;
      case 'provider_id':
        console.log('Auth provider node: ', node);
        break;
      default:
        console.log('Unrecognised node type: ' + node.properties.is_type);
    }
  },

  setUser: function (userData) {
    this.setState({
      user: userData
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
      </Route>
      <Route name="profile" handler={Profile}/>
    </Route>
  </Route>
);

//var routesOld = (
//  <Route handler={App}>
//    <Route name="login" handler={Login}/>
//    <Route name="logout" handler={Logout}/>
//    <Route path=":viewContext" handler={ViewContext}>
//      <Route name="tasks" handler={Tasks}>
//        <Route name="newTask" path="new" handler={AddTask}/>
//        <Route name="task" path=":taskId" handler={Task}/>
//        <Route name="newChildTask" path=":taskId/new" handler={AddTask}/>
//        <Route name="editTask" path=":taskId/edit" handler={EditTask}/>
//      </Route>
//      <Route name="profile" handler={Profile}/>
//    </Route>
//  </Route>
//);

Router.run(routes, function (Handler) {
  var fbRef = new fb(config.db);
  React.render(<Handler fbRef={fbRef} />, document.getElementById('app'));
});

