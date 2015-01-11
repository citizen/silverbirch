'use strict';

var React = require('react'),
    Router = require('react-router'),
    { Link } = Router;

var TaskTreeItem = React.createClass({
  render: function() {
    var task = this.props.task;
    return (
      <li className="task">
        <Link to="task" params={{taskId: task.uid}}>
          <span>{task.title}</span>
          <TaskTree tasks={task.children} />
        </Link>
      </li>
    );
  }
});

var TaskTree = React.createClass({
  render: function() {
    var tasks = Object.keys(this.props.tasks).map(function (taskId) {
      var task = this.props.tasks[taskId];

      if (!task.uid) { return null; }
      return <TaskTreeItem task={task} key={task.uid} />;
    }.bind(this));

    return (
      <ul className="tasks">
        {tasks}
      </ul>
    );
  }
});

module.exports = TaskTree;
