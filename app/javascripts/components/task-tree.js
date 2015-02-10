'use strict';

var React = require('react/addons'),
    Router = require('react-router'),
    { Link } = Router,
    TaskControls = require('./task-controls');

var TaskTreeItem = React.createClass({
  render: function() {
    var task = this.props.task,
        taskTree = (task.children) ? <TaskTree tasks={task.children} /> : '';

    return (
      <li className="task clearfix">
        <span>
          <Link to="task" params={{taskId: task.uid}}>{task.has_meta.title}</Link>
          <TaskControls task={task} {...this.props} />
        </span>
        {taskTree}
      </li>
    );
  }
});

var TaskTree = React.createClass({
  mixins: [
    React.PureRenderMixin
  ],

  render: function() {
    var tasks = Object.keys(this.props.tasks).map(function (taskId) {
      var task = this.props.tasks[taskId];

      if (!Object.keys(task).length || task.archived) { return null; }
      return <TaskTreeItem task={task} key={taskId} {...this.props} />;
    }.bind(this));

    return (
      <ul className="tasks list-unstyled">
        {tasks}
      </ul>
    );
  }
});

module.exports = TaskTree;
