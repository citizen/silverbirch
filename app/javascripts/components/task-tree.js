'use strict';

var _ = require('lodash'),
    $ = require('jquery'),
    moment = require('moment'),
    React = require('react/addons'),
    Router = require('react-router'),
    { Link } = Router,
    TaskControls = require('./task-controls');

var TaskTreeItem = React.createClass({
  getInitialState: function () {
    return {
      userInfo: null,
      taskExpanded: false
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

  expandToggle: function (event) {
    if ( !$(event.target).hasClass('btn-primary-archive') ) {
      this.setState({
        taskExpanded: !this.state.taskExpanded
      })
    };
  },

  render: function() {
    var task = this.props.treeItem,
      	cx = React.addons.classSet,
      	taskTree = (task.relationships.has_children) ?
          <TaskTree tasks={task.relationships.has_children} fbRef={this.props.fbRef} /> :
          '';

    var classes = cx({
      'archived': task.properties.has_state === 'archived',
      'comment-post': true
    });

    var profileLink = (this.props.user.properties.avatar) ?
        <img className="round" src={this.props.user.properties.avatar} /> : '';

    var time = moment(task.properties.created_on).format("dddd, MMMM Do YYYY, h:mm:ss a");

    var description = (this.state.taskExpanded) ?
        <p>{task.properties.has_meta.description}</p> : '';

    var viewContextName = (this.props.viewContext) ?
          this.props.viewContext.properties.sbid.split(":")[1] : "";

    var metaData = (this.state.taskExpanded) ?
      <header className="text-left">
        <time className="comment-date" dateTime="16-12-2014 01:05"><i className="fa fa-clock-o"></i> {time}</time>
      </header> : '';

    return (
      <section className="wrap-left-column">
        <article className="left-column">
          <Link to="task" params={{viewContext: viewContextName, taskId: task.key}}>
            <div className="container" onClick={this.expandToggle}>
              {profileLink}

              <div id="base">
                <div className="task-box-info">
                  <div className="assignees">
                    <i className="fa fa-user"></i>
                  </div>

                  <div className={classes}>
                    <h4>{task.properties.has_meta.title}</h4>
                    {description}
                  </div>

                  {metaData}
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
