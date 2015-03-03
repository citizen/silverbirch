'use strict';

var _ = require('lodash'),
    React = require('react'),
    Router = require('react-router'),
    { Link, RouteHandler } = Router,
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
    this.loadTasks();
  },

  componentWillReceiveProps: function () {
    this.loadTasks();
  },

  loadTasks: function () {
    if (this.props.user) {
      var tasks = {},
          top_tasks_list = [],
          nestedChildrenList = [],
          dbRef = this.props.fbRef,
          userId = this.props.user.sbid;

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
    return (

      <div>
      <br></br>

      <h2 className="page-header">Tasks</h2>
        <section className="comment-list">
          <article className="row">
            <div className="col-md-2 col-sm-2 hidden-xs">
              <figure className="thumbnail">
          
                <img className="img-responsive" src="http://www.keita-gaming.com/assets/profile/default-avatar-c5d8ec086224cb6fc4e395f4ba3018c2.jpg" />
                <figcaption className="text-center">username</figcaption>
              </figure>
            </div>
            <div className="col-md-10 col-sm-10">
              <div className="panel panel-default arrow left">
                <div className="panel-body">
                  <header className="text-left">
                    <div className="comment-user"><i className="fa fa-user"></i> That Guy</div>
                    <time className="comment-date" datetime="16-12-2014 01:05"><i className="fa fa-clock-o"></i> Dec 16, 2014</time>
                  </header>
                  <div className="comment-post">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                  <p className="text-right"><a href="#" className="btn btn-default btn-sm"><i className="fa fa-reply"></i> reply</a></p>
                </div>
              </div>
            </div>
          </article>
          </section>

<div className="row">
  <div className="col-md-6"><TaskTree tasks={this.state.taskTree} {...this.props} /></div>
  <div className="col-md-6"><Link to="newTask" className="btn btn-primary glyphicon glyphicon-plus">
  </Link></div><RouteHandler {...this.props} task={this.state.currentTask} />
</div>
  
      </div>
    );
  }
});

module.exports = Tasks;
