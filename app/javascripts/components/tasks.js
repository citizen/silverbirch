'use strict';

require('firebase');

var _ = require('lodash'),
    React = require('react'),
    ReactFireMixin  = require('reactfire'),
    Authentication = require('./auth').Authentication;

var Tasks = React.createClass({
  mixins: [
    Authentication,
    ReactFireMixin
  ],

  getInitialState: function () {
    return {
      tasks: {}
    };
  },

  componentWillMount: function () {
    var self = this,
        tops = [],
        tasksChildren = [],
        dbRef = new Firebase("https://jkilla.firebaseio.com"),
        tasksRef = dbRef.child("tasks"),
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
          self.updateState(len--, tops, tasksRef);
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

  updateState: function (n, tasks, tasksRef) {
    if (--n < 1) {
      var self = this,
          taskData = {};

      _.each(tasks, function (id) {
        tasksRef.child(id).on('value', function(taskSnapshot) {
          taskData[id] = taskSnapshot.val();
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
        <a className="task" key={ index }>
          <h3>{ item.title }</h3>
          <span>{ item.description }</span>
        </a>
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
