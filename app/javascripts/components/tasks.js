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
    var tops = [],
        tasks = {},
        tasksTasks = [],
        tasksChildren = [],
        dbRef = new Firebase("https://jkilla.firebaseio.com"),
        tasksRef = dbRef.child("tasks"),
        tasksEdgesRef = dbRef.child("tasksEdges"),
        usersTasks = dbRef.child("usersTasks"),
        uid = usersTasks.getAuth().uid;

    usersTasks.child(uid).on('child_added', function(userTaskSnapshot) {
      var taskId = userTaskSnapshot.key();
      tasksTasks.push(taskId);

      tasksEdgesRef.child(taskId).child('child').on('value', function(edgeSnapshot) {
        var children = edgeSnapshot.val();
        if ( children !== null ) {
          var childKeys = Object.keys(children);
          tasksChildren = _.union(tasksChildren, childKeys);
          tops = _.difference(tasksTasks, tasksChildren);
          console.log('tops ' , tops);
        }
      });
    });

    usersTasks.child(uid).on('child_removed', function(childSnapshot) {
      delete this.state.tasks[childSnapshot.key()];
      this.setState({
        tasks: this.state.tasks
      });
    }.bind(this));
  },

  updateState: function (tops) {
    console.log('update tops ' , tops);
  },

  render: function() {
    // console.log('this.state.tasks ' , this.state.tasks);
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
