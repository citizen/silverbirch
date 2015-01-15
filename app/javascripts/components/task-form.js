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

    var userId = this.props.user.username,
        tasksRef = dbRef.child('tasks'),
        edgesRef = dbRef.child('tasksEdges'),
        usersTasksRef = dbRef.child('usersTasks');

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
      edgesRef.child(this.props.parentId+"/child").update(edge);
    }

    usersTasksRef.child(userId).update(edge);

    this.refs.title.getDOMNode().value = "";
    this.refs.description.getDOMNode().value = "";
    return;
  },

  render: function() {
    return (
      <form className="col-md-6" onSubmit={this.handleSubmit}>
        <h4>Add a task</h4>
        <div className="form-group">
          <input
            id="title"
            ref="title"
            type="text"
            placeholder="Title"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <textarea
            id="description"
            ref="description"
            placeholder="Description..."
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-default pull-right">Add</button>
      </form>
    );
  }
});

module.exports = TaskForm;
