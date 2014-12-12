'use strict';

require('firebase');

var React = require('react'),
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
    var tasks = {},
        dbRef = new Firebase("https://jkilla.firebaseio.com"),
        tasksRef = dbRef.child("tasks"),
        usersTasks = dbRef.child("usersTasks"),
        uid = usersTasks.getAuth().uid;

    usersTasks.child(uid).on('child_added', function(childSnapshot) {
      tasksRef.child(childSnapshot.key()).on('value', function(dataSnapshot) {
        tasks[childSnapshot.key()] = dataSnapshot.val();
        this.setState({
          tasks: tasks
        });
      }.bind(this));
    }.bind(this));

    usersTasks.child(uid).on('child_removed', function(childSnapshot) {
      delete this.state.tasks[childSnapshot.key()];
      this.setState({
        tasks: this.state.tasks
      });
    }.bind(this));
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
