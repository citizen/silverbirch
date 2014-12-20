"use strict";

var React = require('react'),
    Router = require('react-router'),
    { Route, RouteHandler, Link } = Router,
    auth = require('./auth').auth,
    Authentication = require('./auth').Authentication,
    UserList = require('./user-list'),
    TaskForm = require('./task-form'),
    TaskList = require('./task-list');

var Task = React.createClass({
  mixins: [
    Router.State,
    Router.Navigation,
    Authentication
  ],

  getInitialState: function () {
    return {
      task: {
        children:[],
        users: {}
      },
      fbRef: this.props.fbRef
    };
  },

  componentWillReceiveProps: function() {
    this.loadTask();
  },

  componentDidMount: function () {
    this.loadTask();
  },

  loadTask: function() {
    var taskId = this.getParams().taskId,
        dbRef = this.state.fbRef,
        tasksRef = dbRef.child("tasks");

    tasksRef.child(taskId).on('value', function(taskSnapshot) {
      var task = taskSnapshot.val();
      task.id = taskSnapshot.key();
      task.children = [];
      this.setState({
        task: task
      });
      dbRef.child('tasksEdges/'+taskId+'/child/').on('child_added', function(taskEdgeSnapshot) {
        dbRef.child('tasks/'+taskEdgeSnapshot.key()).on('value', function(taskSnapshot) {
          var childTask = {};
          childTask.title = taskSnapshot.child('title').val();
          childTask.id = taskSnapshot.key();
          task.children.push(childTask);
          this.setState({
            task: task
          });
        }, this);
      }, this);
    }, this);
  },

  removeUser: function (userId) {
    var taskId = this.state.task.id,
        userRef = this.state.fbRef.child("usersTasks/"+userId+"/"+taskId),
        taskRef = this.state.fbRef.child("tasks/"+taskId+"/users/"+userId);

    function logResult(err) {
      var msg = (err) ? err : userId + " removed from task " + taskId;
      console.info(msg);
    }

    userRef.remove(logResult);
    taskRef.remove(logResult);
  },

  render: function () {
    var task = this.state.task,
        users = Object.keys(task.users);

    return (
      <div className="task">
        <h3>{ task.title }</h3>
        <span>{ task.description }</span>
        <UserList users={users} fbRef={this.props.fbRef} removeUser={this.removeUser} />
        <TaskList tasks={task.children} />
        <TaskForm parentId={task.id} fbRef={this.props.fbRef} />
      </div>
    );
  }
});

module.exports = Task;
