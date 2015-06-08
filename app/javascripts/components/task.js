"use strict";

var React = require('react'),
    Router = require('react-router'),
    { Route, RouteHandler, Link } = Router,
    Authentication = require('./auth');

var Task = React.createClass({
  mixins: [
    Router.State,
    Authentication,
    React.PureRenderMixin
  ],

  getInitialState: function () {
    return {
      task: {}
    };
  },

  componentWillMount: function () {
    this.loadTask();
  },

  componentWillReceiveProps: function () {
    this.loadTask();
  },

  loadTask: function () {
    var taskId = this.getParams().taskId;

    this.props.fbRef.child(taskId).on('value', function (taskData) {
      this.setState({
        task: taskData.val()
      })
    }, this);
  },

  render: function () {
    console.log('this.state.task ' , this.state.task);

    var task = this.state.task,
      	taskMeta = (task.properties && task.properties.has_meta) ? task.properties.has_meta : null,
        title = taskMeta ? taskMeta.title : '',
        description = taskMeta ? taskMeta.description : '';

    var editLink = "";
   //  var editLink = <Link
	  //   to="editTask"
	  //   params={{
	  //     taskId: this.getParams().taskId,
	  //     viewContext: this.getParams().viewContext
	  //   }}
	  //   className="btn-primary"
	  // >Edit</Link>;

    var profileLink = "";
    // var profileLink = (this.props.user) ?
    //       <Link to="profile" params={{username: this.props.user.username}}>
    //         <img className="avatar" src={this.props.user.avatar} />
    //         <span>{this.props.user.username}</span>
    //       </Link> : '';

    return (
      <div className="add-task-box">
        {editLink}

        <div className="task-body">
          <h4>{ title }</h4>

          <blockquote>
            <p>{ description }</p>
          </blockquote>

          {profileLink}
        </div>
      </div>
    );
  }
});

module.exports = Task;
