"use strict";

var React = require('react'),
    Router = require('react-router'),
    { Route, RouteHandler, Link } = Router,
    auth = require('./auth').auth,
    Authentication = require('./auth').Authentication,
    TaskList = require('./task-list');

var Task = React.createClass({
  mixins: [
    Router.State,
    Router.Navigation,
    Authentication
  ],

  getInitialState: function () {
    return {
      task: {children:[]},
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

  render: function () {
    var task = this.state.task;
    return (
      <div className="task">
        <h3>{ task.title }</h3>
        <p>wtf -> {this.getParams().taskId}</p>
        <span>{ task.description }</span>
        <TaskList tasks={task.children} />
      </div>
    );
  }
});

module.exports = Task;
