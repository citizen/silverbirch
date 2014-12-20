"use strict";

var React = require("react");

var TaskForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();

    var dbRef = this.props.fbRef,
        title = this.refs.title.getDOMNode().value.trim(),
        description = this.refs.description.getDOMNode().value.trim() || null;

    if (!title) {
      window.alert('Title is required!');
      return;
    }

    var userId = dbRef.getAuth().uid,
        tasksRef = dbRef.child('tasks'),
        edgesRef = dbRef.child('tasksEdges'),
        usersTasksRef = dbRef.child('usersTasks');

    // save that shit
    var task = {
      "users": {},
      "title": title,
      "description": description
    };

    task.users[userId] = true;

    var newTask = tasksRef.push(task);

    var edge = {};
    edge[newTask.key()] = true;

    if( this.props.parentId ) {
      edgesRef.child(this.props.parentId+'/child').update(edge);
    }

    usersTasksRef.child(userId).update(edge);

    this.refs.title.getDOMNode().value = "";
    this.refs.description.getDOMNode().value = "";
    return;
  },

  render: function() {
    return (
      <form className="taskForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Title" ref="title" />
        <input type="textarea" placeholder="Description..." ref="description" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

module.exports = TaskForm;
