'use strict';

var _ = require('lodash'),
    React = require('react'),
    Router = require('react-router'),
    { Route, Link } = Router,
    Authentication = require('./auth').Authentication;

var Tasks = React.createClass({
  mixins: [
    Router.State,
    Authentication
  ],

  getInitialState: function () {
    return {
      tasks: {},
      fbRef: this.props.fbRef
    };
  },

  componentWillMount: function () {
    var self = this,
        tops = [],
        tasksChildren = [],
        dbRef = this.state.fbRef,
        tasksEdgesRef = dbRef.child("tasksEdges"),
        usersTasks = dbRef.child("usersTasks"),
        uid = usersTasks.getAuth().uid;

    usersTasks.child(uid).on('value', function(userTaskSnapshot) {
      var tasks = Object.keys(userTaskSnapshot.val()),
          len = tasks.length;

      _.each(tasks, function(id) {
        tasksEdgesRef.child(id).child('child').on('value', function(edgeSnapshot) {
          var children = edgeSnapshot.val();
          if ( children ) {
            var childKeys = Object.keys(children);
            tasksChildren = _.union(tasksChildren, childKeys);
            tops = _.difference(tasks, tasksChildren);
          }
          self.updateState(len--, tops, dbRef);
        });
      });
    });

    usersTasks.child(uid).on('child_removed', function(childSnapshot) {
      delete this.state.tasks[childSnapshot.key()];
      this.setState({
        tasks: this.state.tasks
      });
    }.bind(this));
  },

  updateState: function (n, tasks, dbRef) {
    var tasksRef = dbRef.child("tasks"),
        tasksEdgesRef = dbRef.child("tasksEdges");

    if (--n < 1) {
      var self = this,
          taskData = {};

      _.each(tasks, function (id) {
        tasksRef.child(id).on('value', function(taskSnapshot) {
          taskData[id] = taskSnapshot.val();
          taskData[id].uid = taskSnapshot.key();

          tasksEdgesRef.child(taskSnapshot.key()).child('child').once('value', function(children) {
            taskData[id].childCount = Object.keys(children.val()).length;
          });

          self.setState({
            tasks: taskData
          });
        });
      });
    }
  },

  render: function() {
    var createItem = function(item, index) {
      item = this.state.tasks[item];
      return (
        <Link to="task" params={{taskId: item.uid}} className="task" key={ index }>
          <h3>
            { item.title }
            <span className="badge">{item.childCount}</span>
          </h3>
          <span>{ item.description }</span>
        </Link>
      );
    }.bind(this);

    return (
      <div className="task-list">
        { Object.keys(this.state.tasks).map(createItem) }
      </div>
    );
  }
});

module.exports = Tasks;
