'use strict';

var React = require('react/addons'),
    Router = require('react-router'),
    { Link } = Router,
    TaskControls = require('./task-controls');

var TaskTreeItem = React.createClass({
  render: function() {
    var task = this.props.task,
	cx = React.addons.classSet,
	taskTree = (task.children) ? <TaskTree tasks={task.children} fbRef={this.props.fbRef} /> : '';

    var classes = cx({
      'archived': task.has_state === 'archived'
    });

     var profileLink = (this.props.user) ?
          <Link to="profile" params={{username: this.props.user.username}}>
            <img className="avatar" src={this.props.user.avatar} />
            <span>{this.props.user.username}</span>
          </Link> : '';




    return (
      <li className="task clearfix">
      {profileLink}
        <span>
      	  <Link to="task" params={{taskId: task.uid}} className={classes}>{task.has_meta.title}</Link>
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
      <div className="">
      <ul className="tasks list-unstyled">
        {tasks}
      </ul>
      </div>
    );
  }
});

module.exports = TaskTree;
