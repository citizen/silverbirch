'use strict';

var React = require('react'),
    Router = require('react-router'),
    { Route } = Router,
    App = require('./components/app'),
    Task = require('./components/task'),
    Tasks = require('./components/tasks'),
    Login = require('./components/login'),
    Logout = require('./components/logout'),
    Profile = require('./components/profile'),
    Report = require('./components/report'),
    AddTask = require('./components/task-form-add'),
    ViewContext = require('./components/view-context'),
    NewTeam = require('./pages/teams/new');

var routes = (
  <Route handler={App}>
    <Route name="login" handler={Login}/>
    <Route name="logout" handler={Logout}/>

    <Route name="teams" handler={NewTeam}>
      <Route name="newTeam" path="new" handler={NewTeam}/>
    </Route>

    <Route path=":viewContext" handler={ViewContext}>
      <Route name="tasks" handler={Tasks}>
        <Route name="newTask" path="new" handler={AddTask}/>
        <Route name="task" path=":taskId" handler={Task}>
          <Route name="editTask" path="edit" handler={Task}/>
        </Route>
      </Route>
      <Route name="profile" handler={Profile}/>
      <Route name="report" handler={Report}/>
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

module.exports = routes;
