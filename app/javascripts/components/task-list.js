"use strict";

var React = require('react'),
    Router = require('react-router'),
    { Route, RouteHandler, Link } = Router;

var TaskList = React.createClass({
  render: function() {
    var taskNodes = this.props.tasks.map(function(task, index) {
      return (
        <li>
          <Link to="task" params={{taskId: task.id}} key={index}>{task.title}</Link>
        </li>
      );
    });
    return (
      <div className="taskList">
        <ul>
          {taskNodes}
        </ul>
      </div>
    );
  }
});

module.exports = TaskList;
