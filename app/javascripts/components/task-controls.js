'use strict';

var React = require('react'),
    Router = require('react-router'),
    { Link } = Router;

var TaskControls = React.createClass({
  archiveTask: function () {
    var tasksRef = this.props.fbRef.child('tasks');
    tasksRef.child(this.props.task.uid).update({
      'archived': true
    });
  },

  render: function() {
    return (
      <div className="task-controls">
        <Link
          to="newChildTask"
          params={{taskId: this.props.task.uid}}
          className="glyphicon glyphicon-plus pull-left"
        ></Link>
        <span
          onClick={this.archiveTask}
          className="glyphicon glyphicon-remove pull-left"
        >
        </span>
      </div>
    );
  }
});

module.exports = TaskControls;