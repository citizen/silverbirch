'use strict';

var React = require('react'),
    Router = require('react-router'),
    { Link } = Router;

var TaskControls = React.createClass({
  mixins: [
    Router.State
  ],

  archiveTask: function () {
    this.props.fbRef.child(this.props.task.uid).update({
      'has_state': 'archived'
    });
  },

  render: function() {
    return (
      <div className="task-controls">
        <Link
          to="newChildTask"
          params={{
            taskId: this.props.task.uid,
            viewContext: this.getParams().viewContext
          }}
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
