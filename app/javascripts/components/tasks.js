'use strict';

var _ = require('lodash'),
    React = require('react/addons'),
    Router = require('react-router'),
    { RouteHandler } = Router,
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
      treeTops: {}
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
      var tops = [],
          kids = [],
          dbRef = this.props.fbRef,
          username = this.props.user.username,
          tasksRef = dbRef.child("tasks"),
          edgesRef = dbRef.child("tasksEdges"),
          usersTasks = dbRef.child("usersTasks");

      usersTasks.child(username).on('child_added', function(usersTask) {
        var taskId = usersTask.key();

        tasksRef.child(taskId).on('value', function(taskData) {
          var task = {};

          task[taskId] = {
            uid: taskId,
            title: taskData.val().title,
            children: {}
          };

          this.updateTasks(task);

          var newState = React.addons.update(this.state.treeTops, {
            $merge: task
          });

          this.setState({
            treeTops: newState
          });

          edgesRef.child(taskId).child('child').on('child_added', function(childData) {
            var topsObj = {},
                childId = childData.key();

            task[taskId].children[childId] = this.state.tasks[childId];
            this.updateTasks(task);

            // find tree tops
            kids = _.union(kids, [childId]);
            tops = (tops.length) ? tops : Object.keys(this.state.tasks);
            tops = _.difference(tops, kids);

            tops.forEach(function (taskId) {
              topsObj[taskId] = this.state.tasks[taskId];
            }.bind(this));

            this.setState({
              treeTops: topsObj
            });
          }.bind(this));

        }.bind(this));

      }.bind(this));
    }
  },

  updateTasks: function (task) {
    var newState = React.addons.update(this.state.tasks, {
      $merge: task
    });

    this.setState({
      tasks: newState
    });
  },

  render: function() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <TaskTree tasks={this.state.treeTops} />
          </div>
          <RouteHandler {...this.props} />
        </div>
        <TaskForm {...this.props} />
      </div>
    );
  }
});

module.exports = Tasks;
