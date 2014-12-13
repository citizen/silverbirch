"use strict";

var React = require('react'),
    Router = require('react-router'),
    { Route, RouteHandler, Link } = Router,
    ReactFireMixin  = require('reactfire'),
    auth = require('./auth').auth,
    Authentication = require('./auth').Authentication;

var Task = React.createClass({
  mixins: [
    Router.State,
    Authentication
  ],

  getInitialState: function () {
    return {
      task: {}
    };
  },

  componentWillMount: function () {
    var {taskId} = this.getParams(),
        dbRef = new Firebase("https://jkilla.firebaseio.com"),
        tasksRef = dbRef.child("tasks");

    tasksRef.child(taskId).on('value', function(taskSnapshot) {
      this.setState({
        task: taskSnapshot.val()
      });
    }.bind(this));
  },

  render: function () {
    var task = this.state.task;
    console.log('task ' , task);
    return (
      <div className="task">
        <h3>{ task.title }</h3>
        <span>{ task.description }</span>
      </div>
    );
  }
});

module.exports = Task;
