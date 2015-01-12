'use strict';

var React = require('react'),
    Router = require('react-router'),
    { Link } = Router,
    TaskControls = require('./task-controls');

var TaskTreeItem = React.createClass({
  render: function() {
    var task = this.props.task;
    return (
      <li className="task clearfix">
        <Link to="task" params={{taskId: task.uid}} className="pull-left">
          <h4 className="title">{task.title}</h4>
          <TaskTree tasks={task.children} />
        </Link>
        <TaskControls task={task} {...this.props} />
      </li>
    );
  }
});

var TaskTree = React.createClass({
  render: function() {
    var tasks = Object.keys(this.props.tasks).map(function (taskId) {
      var task = this.props.tasks[taskId];

      if (!task.uid || task.archived) { return null; }
      return <TaskTreeItem task={task} key={task.uid} {...this.props} />;
    }.bind(this));

    return (
      <ul className="tasks list-unstyled">
        {tasks}
      </ul>
    );
  }
});

module.exports = TaskTree;
