"use strict";

var React = require("react"),
    Router = require("react-router");

var TaskForm = React.createClass({
  mixins: [ Router.State ],

  handleSubmit: function(e) {
    e.preventDefault();

    var task, newTaskId, taskList,
	owner = this.props.viewContext,
        dbRef = this.props.fbRef,
        parentId = this.getParams().taskId,
        title = this.refs.title.getDOMNode().value.trim(),
        description = this.refs.description.getDOMNode().value.trim() || null;

    if (!title) {
      window.alert('Title is required!');
      return;
    }

    var has_users = {};
    has_users[owner.sbid] = true;
    task = {
      "is_type": "task",
      "has_state": "open",
      "has_users": has_users,
      "created_on": Date.now(),
      "created_by": this.props.user.sbid,
      "has_meta": {
        "title": title,
        "description": description
      }
    };
    task.has_users[owner.sbid] = true;

    // create new task
    newTaskId = dbRef.push(task);

    // find owner's task list (or create it if it doesn't exist)
    if (owner.has_task_list) {
      taskList = owner.has_task_list;
    } else {
      taskList = dbRef.push({"is_type": "taskList", "has_users": has_users});
      taskList = taskList.key();
      dbRef.child(owner.sbid + '/has_task_list').set(taskList);
    }

    // add new task to task list
    dbRef.child(taskList + '/has_tasks/' + newTaskId.key()).set(true);

    if( parentId ) {
      var childTask = {};
      childTask[newTaskId.key()] = true;
      dbRef.child(parentId + '/has_children').update(childTask);
    }

    this.refs.title.getDOMNode().value = "";
    this.refs.description.getDOMNode().value = "";
    return;
  },

  render: function() {
    var formTitle = this.getParams().taskId ?
      'Add a task to ' + this.getParams().taskId :
      'Add a task';

    return (
      <form className="col-md-6" onSubmit={this.handleSubmit}>
        <h4>{formTitle}</h4>
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
