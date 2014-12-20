"use strict";

var React = require('react'),
    Router = require('react-router'),
    { Route, RouteHandler, Link } = Router;

var TaskList = React.createClass({
  render: function() {
    var taskNodes = this.props.tasks.map(function(task, index) {
      return (
        <li key={index}>
          <Link to="task" params={{taskId: task.id}}>{task.title}</Link>
        </li>
      );
    });
    return (
      <div className="taskList">
        <h4>Child tasks</h4>
        <ul>
          {taskNodes}
        </ul>
      </div>
    );
  }
});

module.exports = TaskList;
