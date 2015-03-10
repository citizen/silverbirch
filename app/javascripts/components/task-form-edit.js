"use strict";

var _ = require('lodash'),
    React = require("react"),
    Router = require("react-router"),
    { Link } = Router;

var TaskForm = React.createClass({
  mixins: [
    Router.State,
    Router.Navigation
  ],

  getInitialState: function() {
    return {
      titleValue: Object.keys(this.props.task).length ? this.props.task.has_meta.title : '',
      descriptionValue: Object.keys(this.props.task).length ? this.props.task.has_meta.description : ''
    };
  },

  componentWillReceiveProps: function () {
    this.setState({
      titleValue: Object.keys(this.props.task).length ? this.props.task.has_meta.title : '',
      descriptionValue: Object.keys(this.props.task).length ? this.props.task.has_meta.description : ''
    });
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var task,
        taskList,
        newTaskId,
        dbRef = this.props.fbRef,
        taskId = this.getParams().taskId,
        title = this.refs.title.getDOMNode().value.trim(),
        description = this.refs.description.getDOMNode().value.trim() || null;

    if (!title) {
      window.alert('Title is required!');
      return;
    }

    task = {
      "has_meta": {
        "title": title,
        "description": description
      }
    };

    // update task
    dbRef.child(taskId).update(task);

    this.refs.title.getDOMNode().value = "";
    this.refs.description.getDOMNode().value = "";

    this.transitionTo('task', {
      taskId: taskId,
      viewContext: this.getParams().viewContext
    });

    return;
  },

  handleChange: function(event) {
    var temp = {};
    temp[event.target.id + 'Value'] = event.target.value;
    this.setState(temp);
  },

  render: function() {
    return (
      <form className="panel col-md-6" onSubmit={this.handleSubmit}>
        <h4>Edit task {this.getParams().taskId}</h4>

        <div className="form-group">
          <input
            id="title"
            ref="title"
            type="text"
            placeholder="Title"
            className="form-control"
            onChange={this.handleChange}
            value={this.state.titleValue}
          />
        </div>

        <div className="form-group">
          <textarea
            id="description"
            ref="description"
            className="form-control"
            placeholder="Description..."
            onChange={this.handleChange}
            value={this.state.descriptionValue}
          />
        </div>

        <div className="form-group pull-right">
          <button type="submit" className="btn btn-primary pull-left">Save</button>

          <Link
            to="task"
            params={{
              taskId: this.getParams().taskId,
              viewContext: this.getParams().viewContext
            }}
            className="btn btn-link pull-right"
          >Cancel</Link>
        </div>
      </form>
    );
  }
});

module.exports = TaskForm;
