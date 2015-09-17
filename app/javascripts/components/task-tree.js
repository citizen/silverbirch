'use strict';

var _ = require('lodash'),
  $ = require('jquery'),
  React = require('react/addons'),
  Router = require('react-router'), {
    Link
  } = Router,
  MembersDropdown = require('./includes/assign-dropdown'),
  TaskControls = require('./task-controls');

var TaskTreeItem = React.createClass({
  getInitialState: function() {
    return {
      userInfo: null,
      assignTask: null,
      isAssignDropdownViewable: false
    };
  },

  componentDidMount: function() {
    this.setCreator();
  },

  setCreator: function() {
    if (!this.props.treeItem.properties.created_by) {
      return false;
    };

    var user = this.props.treeItem.properties.created_by;

    this.setState({
      userInfo: this.props.graph[user]
    });
  },

  assignMemberDropdown: function(e) {
    e.preventDefault();

    this.setState({
      isAssignDropdownViewable: !this.state.isAssignDropdownViewable
    });
  },

  render: function() {
    var task = this.props.treeItem,
      taskTree = (task.relationships.has_children)
        ? <TaskTree fbRef={this.props.fbRef} tasks={task.relationships.has_children}/>
        : '';

    var profileLink = (this.state.userInfo && this.state.userInfo.properties)
      ? <img className="avatar-img" src={this.state.userInfo.properties.avatar}/>
      : '';

    var viewContextName = (this.props.viewContext)
      ? this.props.viewContext.properties.sbid.split(":")[1]
      : "";

    var assigneeDropdown = (!this.props.closeDropdowns && this.state.isAssignDropdownViewable)
      ? <MembersDropdown assignTask={this.state.assignTask} {...this.props}/>
      : false;

    var assignedMembers = [];

    if (this.props.treeItem.relationships && this.props.treeItem.relationships.has_assigned_members) {
      assignedMembers = Object.keys(this.props.treeItem.relationships.has_assigned_members).map(function(member) {
        var memberObj = this.props.graph[member];

        return (
          <div className="assignee_1" key={memberObj.key}>
            <img className="assignee-img" src={memberObj.properties.avatar}/>
          </div>
        );
      }.bind(this));
    }

    return (
      <div className="task-wrapper">
        <div className="task">
          {profileLink}

          <div className="delete"></div>
          <div className="menu"></div>

          <div className="task-text">
            <Link params={{
              viewContext: viewContextName,
              taskId: task.key
            }} to="task">
              <h5 className="">{task.properties.has_meta.title}</h5>
            </Link>

            <span className="">Labels to go here</span>
          </div>

          <div className="assignee">
            {assignedMembers}

            <div className="add_assignee" onClick={this.assignMemberDropdown}>
              <img className="add_assignee-img" src="https://cdn4.iconfinder.com/data/icons/online-menu/64/plus_add_additional_circle-128.png"/>
              {assigneeDropdown}
            </div>
          </div>

          <div className="status">
            <span className="profile-title">80% Complete</span>
          </div>
          <div className="cycle-time">
            <span className="profile-title">Cycle Time: 3 days</span>
          </div>

          <TaskControls task={task} {...this.props}/>

          {/* taskTree */}
        </div>
      </div>
    );
  }
});

var TaskTree = React.createClass({
  getInitialState: function() {
    return {
      taskTree: {}
    };
  },

  componentWillReceiveProps: function() {
    var taskList = {},
      graph = this.props.graph;

// TODO: clean up this horrid hacky mess
    if (this.props.user) {
      var isViewing = graph[this.props.user.properties.is_viewing];

      if (isViewing.relationships && isViewing.relationships.hasOwnProperty('has_task_list')) {
        if (graph[isViewing.relationships.has_task_list.key] && graph[isViewing.relationships.has_task_list.key].relationships) {
          taskList = graph[isViewing.relationships.has_task_list.key].relationships.has_tasks;
        };
      };

    };

    var tasksAll = [];
    if (taskList) {
      tasksAll = Object.keys(taskList).filter(function(task) {
        if (graph[task].hasOwnProperty('properties') && graph[task].properties.hasOwnProperty('has_state') && graph[task].properties.has_state !== 'archived') {
          return graph[task].properties.is_type === 'task';
        }
      });
    };

    this.processGraph(tasksAll, graph);
  },

  processGraph: function(tasksAll, graph) {
    Object.keys(graph).forEach(function(node) {
      var taskTree = {},
        tasksWithChildren = [],
        treeTops = this.state.taskTree;

      treeTops[node.key] = node;

      tasksWithChildren = _.flatten(tasksAll.filter(function(task) {
        if (graph[task].hasOwnProperty('relationships')) {
          return graph[task].relationships.hasOwnProperty('has_children');
        }
      }).map(function(taskId) {
        if (graph[taskId].relationships && graph[taskId].relationships.hasOwnProperty('has_children')) {
          return Object.keys(graph[taskId].relationships.has_children);
        }
      }));

      treeTops = _.difference(tasksAll, tasksWithChildren);

      treeTops.forEach(function(taskId) {
        taskTree[taskId] = graph[taskId];
      });

      this.setState({
        taskTree: taskTree
      });
    }.bind(this));
  },

  render: function() {
    var tasks = Object.keys(this.state.taskTree).map(function(taskId) {
      var task = this.props.graph[taskId];

      if (!Object.keys(task).length || task.properties.archived) {
        return null;
      }

      return <TaskTreeItem key={taskId} treeItem={task} {...this.props}/>;
    }.bind(this));

    return (
      <div>
        {tasks}
      </div>
    );
  }
});

module.exports = TaskTree;
