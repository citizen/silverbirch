'use strict';

var _ = require('lodash'),
    $ = require('jquery'),
    React = require('react/addons'),
    Router = require('react-router'),
    { Link } = Router,
    TaskControls = require('./task-controls');

var TaskTreeItem = React.createClass({
  getInitialState: function () {
    return {
      userInfo: null
    };
  },

  componentWillMount: function () {
    this.setCreator();
  },

  setCreator: function() {
    if (!this.props.treeItem.properties.created_by) { return false; };

    var user = this.props.treeItem.properties.created_by;

    this.props.fbRef.child(user).once('value', function (userSnapshot) {
      var userData = userSnapshot.val();

      this.setState({
        userInfo: userData
      });
    }.bind(this));
  },

  render: function() {
    var task = this.props.treeItem,
      	taskTree = (task.relationships.has_children) ?
          <TaskTree tasks={task.relationships.has_children} fbRef={this.props.fbRef} /> :
          '';

    var profileLink = (this.props.user.properties.avatar) ?
        <img className="round" src={this.props.user.properties.avatar} /> : '';

    var viewContextName = (this.props.viewContext) ?
          this.props.viewContext.properties.sbid.split(":")[1] : "";

    return (
      <section className="wrap-left-column">
        <article className="left-column">
          <Link to="task" params={{viewContext: viewContextName, taskId: task.key}}>
            <div className="container">
              {profileLink}

              <div id="base">
                <div className="task-box-info">
                  <div className="assignees">
                    <i className="fa fa-user"></i>
                  </div>
                  <h4>{task.properties.has_meta.title}</h4>
                </div>

                <TaskControls task={task} {...this.props} />

                {taskTree}
              </div>
            </div>
          </Link>
        </article>
      </section>
    );
  }
});

var TaskTree = React.createClass({
  getInitialState: function () {
    return {
      taskTree: {}
    };
  },

  componentWillReceiveProps: function () {
    var graph = this.props.graph;

    var tasksAll = Object.keys(graph).filter(function (task) {
      if (
        graph[task].hasOwnProperty('properties') &&
        graph[task].properties.hasOwnProperty('has_state') &&
        graph[task].properties.has_state !== 'archived'
      ) {
        return graph[task].properties.is_type === 'task';
      }
    });

    this.processGraph(tasksAll, graph);
  },

  processGraph: function (tasksAll, graph) {
    Object.keys(graph).forEach(function (node) {
      var taskTree = {},
          tasksWithChildren = [],
          treeTops = this.state.taskTree;

      treeTops[node.key] = node;

      tasksWithChildren = _.flatten(tasksAll
        .filter(function (task) {
          if (graph[task].hasOwnProperty('relationships')) {
            return graph[task].relationships.hasOwnProperty('has_children');
          }
        })
        .map(function (taskId) {
          if (
            graph[taskId].relationships &&
            graph[taskId].relationships.hasOwnProperty('has_children')
          ) {
            return Object.keys(graph[taskId].relationships.has_children);
          }
        })
      );

      treeTops = _.difference(tasksAll, tasksWithChildren);

      treeTops.forEach(function (taskId) {
        taskTree[taskId] = graph[taskId];
      });

      this.setState({
        taskTree: taskTree
      });
    }.bind(this));
  },

  render: function() {
    var tasks = Object.keys(this.state.taskTree).map(function (taskId) {
      var task = this.props.graph[taskId];

      if (!Object.keys(task).length || task.properties.archived) { return null; }

      return <TaskTreeItem treeItem={task} key={taskId} {...this.props} />;
    }.bind(this));

    return (
      <div>
        {tasks}
      </div>
    );
  }
});

module.exports = TaskTree;
