'use strict';

var _ = require('lodash'),
    React = require('react'),
    Router = require('react-router'),
    { RouteHandler } = Router,
    SbFbGraph = require('./sbFbGraph');

var App = React.createClass({
  mixins: [
    Router.State,
    Router.Navigation
  ],

  getInitialState: function () {
    return {
      user: null,
      taskTree: {}
    };
  },

  componentWillMount: function () {
    this.props.fbRef.onAuth(function (auth) {
      if(auth) {
        // user is logged in, sync graph
        this.sbFbGraph = new SbFbGraph(this.props.fbRef, auth.uid, this.processGraph);
      }
      else {
        // user is logged out, redirect to login
        this.transitionTo('login');
      }
    }, this);
  },

  processGraph: function (sbGraph, node) {
    switch (node.properties.is_type) {
      case 'task':
        var taskTree = {},
            tasksAll = [],
            tasksWithChildren = [],
            treeTops = this.state.taskTree;

        treeTops[node.key] = node;

        tasksAll = Object.keys(sbGraph)
          .filter(function (task) {
            if (
              sbGraph[task].hasOwnProperty('properties') &&
              sbGraph[task].properties.hasOwnProperty('has_state') &&
              sbGraph[task].properties.has_state !== 'archived'
            ) {
              return sbGraph[task].properties.is_type === 'task';
            }
          });

        tasksWithChildren = _.flatten(tasksAll
          .filter(function (task) {
            if (sbGraph[task].hasOwnProperty('relationships')) {
              return sbGraph[task].relationships.hasOwnProperty('has_children');
            }
          })
          .map(function (taskId) {
            if (
              sbGraph[taskId].relationships &&
              sbGraph[taskId].relationships.hasOwnProperty('has_children')
            ) {
              return Object.keys(sbGraph[taskId].relationships.has_children);
            }
          })
        );

        treeTops = _.difference(tasksAll, tasksWithChildren);

        treeTops.forEach(function (taskId) {
          taskTree[taskId] = sbGraph[taskId];
        });

        this.setState({
          taskTree: taskTree
        });
        break;

      case 'taskList':
        // console.log('TaskList node: ', node);
        break;

      case 'user':
        // console.log('User node: ', node);
        this.setUser(node);
        break;

      case 'provider_id':
        // console.log('Auth provider node: ', node);
        break;
      default:
        console.warn('Unrecognised node type: ' + node.properties.is_type);
    }
  },

  setUser: function (userData) {
    this.setState({
      user: userData
    });
    this.forceUpdate();
  },

  render: function () {
    return (
      <RouteHandler
        user={this.state.user}
        tasks={this.state.taskTree}
        {...this.props} />
    );
  }
});

module.exports = App;
