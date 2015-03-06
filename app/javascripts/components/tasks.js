'use strict';

var _ = require('lodash'),
    React = require('react'),
    Router = require('react-router'),
    { Link, RouteHandler } = Router,
    Menu = require('./menu'),
    TaskTree = require('./task-tree'),
    Authentication = require('./auth');

var Tasks = React.createClass({
  mixins: [
    Router.State,
    Authentication
  ],


  getInitialState: function () {
    return {
      taskTree: {},
      currentTask: {}
    };
  },

  componentWillMount: function () {
    this.loadTasks(this.props.viewContext);
  },

  componentWillReceiveProps: function (nextProps) {
    this.loadTasks(nextProps.viewContext);
  },

  loadTasks: function (viewContext) {
    if (this.props.user) {
      var tasks = {},
          top_tasks_list = [],
          nestedChildrenList = [],
          dbRef = this.props.fbRef,
          userId = 'sb:' + viewContext;

      dbRef.child(userId + '/has_task_list').once('value', function(taskList) {
        if (!taskList.val()) { return false; }

        dbRef.child(taskList.val() + '/has_tasks').on('child_added', function(userTask) {
          var taskId = userTask.key();

          dbRef.child(taskId).on('value', function(taskData) {
            var task = taskData.val();

            tasks[taskId] = (taskId in tasks) ? tasks[taskId] : {};
            tasks[taskId].uid = taskId;
            tasks[taskId].children = {};

            for (var prop in task) {
              if(task.hasOwnProperty(prop) && prop !== 'has_children') {
                tasks[taskId][prop] = task[prop];
              }
            }

            if ('has_children' in task) {
              Object.keys(task.has_children).forEach(function(childId, idx) {
                if (!(childId in tasks)) {
                  tasks[childId] = {};
                }
                tasks[taskId].children[childId] = tasks[childId];
              });
            }

            nestedChildrenList = Object.keys(tasks).map(function(taskId) {
              if ('children' in tasks[taskId] && Object.keys(tasks[taskId]['children'])) {
                return Object.keys(tasks[taskId]["children"]);
              }
            });

            var test = _.flatten(nestedChildrenList);

            top_tasks_list = _.difference(Object.keys(tasks), _.flatten(nestedChildrenList));

            var top_tasks_hash = {};
            top_tasks_list.forEach(function(taskId) {
              top_tasks_hash[taskId] = tasks[taskId];
            });

            // TODO: investigate the performance of clobbering state like this
            // vs React's immutability helpers (see `this.updateTasks()` below)
            if( this.getParams().taskId && this.getParams().taskId === taskId ) {
              this.setState({currentTask: tasks[this.getParams().taskId]});
            }

            this.setState({taskTree: top_tasks_hash});

          }.bind(this));
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
    var leftMenuItems = [
      "SilverBirch",
      "WebOps"
    ];

    var rightMenuItems = [
      "rpowis",
      "jsuarez",
      "tommyvn",
      "chrisk2020",
      "anguspaterson"
    ];
        // <Menu position="left" title="Teams" menuItems={leftMenuItems} />
        // <Menu position="right" title="Members" menuItems={rightMenuItems} />
        // <div className="col-md-6">
        //   <TaskTree tasks={this.state.taskTree} {...this.props} />
        // </div>
        // <div className="col-md-6">
        //   <Link to="newTask" className="btn btn-primary glyphicon glyphicon-plus"></Link>
        // </div>
        // <RouteHandler {...this.props} task={this.state.currentTask} />
    return (
      <div className="row">
        <div className="col-md-6">
          <TaskTree tasks={this.state.taskTree} {...this.props} />
        </div>
      </div>
    );
  }
});

module.exports = Tasks;
