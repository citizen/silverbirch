'use strict';

var _ = require('lodash'),
    React = require('react/addons'),
    Router = require('react-router'),
    { Link, RouteHandler } = Router,
    TaskForm = require('./task-form'),
    TaskTree = require('./task-tree'),
    Authentication = require('./auth');

var Tasks = React.createClass({
  mixins: [
    Router.State,
    Authentication
  ],

  getInitialState: function () {
    return {
      tasks: {},
      topTasks: {}
    };
  },

  componentWillMount: function () {
    this.loadTasks();
  },

  componentWillReceiveProps: function () {
    this.loadTasks();
  },

  loadTasks: function () {
    if (this.props.user) {
      var tasks = {},
          top_tasks_list = [],
          top_tasks_hash = {},
          nestedChildrenList = [],
          dbRef = this.props.fbRef,
          username = this.props.user.username;

      dbRef.child('usersTasks/' + username).on('child_added', function(usersTask) {
        var taskId = usersTask.key();

        dbRef.child('tasks/' + taskId).on('value', function(taskData) {
          var task = taskData.val();

          tasks[taskId] = (taskId in tasks) ? tasks[taskId] : {};

          tasks[taskId] = taskData.val();
          tasks[taskId].uid = taskId;
          tasks[taskId].children = {};
          delete tasks[taskId].relationships;

          if ('relationships' in task && 'children' in task.relationships) {
            Object.keys(task.relationships.children).forEach(function(childId, idx) {
              if (!(childId in tasks)) {
                tasks[childId] = {};
              }
              tasks[taskId].children[childId] = tasks[childId];
            });
          }

          nestedChildrenList = Object.keys(tasks).map(function(taskId) {
            if ('children' in tasks[taskId] && Object.keys(tasks[taskId]['children'])) {
              var children = Object.keys(tasks[taskId]["children"]);
              return children;
            } else {
              return [];
            }
          });

          top_tasks_list = _.difference(Object.keys(tasks), _.flatten(nestedChildrenList));

          top_tasks_list.forEach(function(taskId) {
            top_tasks_hash[taskId] = tasks[taskId];
          });

          // TODO: investigate the performance of clobbering state like this
          // vs React's immutability helpers (see `this.updateTasks()` below)
          this.setState({
            tasks: tasks,
            topTasks: top_tasks_hash
          });

        }.bind(this));

      }.bind(this));
    }
  },

  // updateTasks: function (task) {
  //   var newState = React.addons.update(this.state.tasks, {
  //     $merge: task
  //   });

  //   this.setState({
  //     tasks: newState
  //   });
  // },

  render: function() {
    return (
      <div>
        <Link to="newTask" className="btn btn-primary glyphicon glyphicon-plus"></Link>
        <div className="row">
          <div className="col-md-6">
            <TaskTree tasks={this.state.topTasks} {...this.props} />
          </div>
          <RouteHandler {...this.props} />
        </div>
      </div>
    );
  }
});

module.exports = Tasks;
