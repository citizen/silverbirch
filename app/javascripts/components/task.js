"use strict";

var moment = require('moment'),
    React = require('react'),
    Router = require('react-router'),
    { Route, RouteHandler, Link } = Router,
    Authentication = require('./auth');

var Task = React.createClass({
  mixins: [
    Router.State,
    Router.Navigation,
    Authentication
  ],

  getInitialState: function() {
    return {
      titleValue: '',
      descriptionValue: ''
    };
  },

  componentWillReceiveProps: function () {
    var task = this.props.graph[this.getParams().taskId];

    if( task && task.hasOwnProperty('key') ) {
      this.setState({
        titleValue: task.properties.has_meta.title,
        descriptionValue: task.properties.has_meta.description
      });
    }
  },

  isEditing: function () {
    var pathParts = this.getPathname().split('/'),
        isEditing = pathParts[pathParts.length - 1] === 'edit';

    return isEditing;
  },

  handleChange: function(event) {
    var temp = {};
    temp[event.target.id + 'Value'] = event.target.value;
    this.setState(temp);
  },

  handleSubmit: function(event) {
    if( this.isEditing() ) {
      event.preventDefault();

      var taskId = this.getParams().taskId,
          task = this.props.graph[taskId],
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
      this.props.fbRef.child(taskId + '/properties').update(task);

      this.refs.title.getDOMNode().value = "";
      this.refs.description.getDOMNode().value = "";

      this.transitionTo('task', {
        taskId: taskId,
        viewContext: this.getParams().viewContext
      });

      return;
    }
  },

  render: function () {
    var isEditing = this.isEditing(),
        task = this.props.graph[this.getParams().taskId];

    if( task && 'properties' in task ) {
      var taskMeta = (task.properties && task.properties.has_meta) ? task.properties.has_meta : null,
          titleText = (isEditing) ? this.state.titleValue : taskMeta.title,
          descriptionText = (isEditing) ? this.state.descriptionValue : taskMeta.description;

      var editLink = <Link
  	    to="editTask"
  	    params={{
  	      taskId: this.getParams().taskId,
  	      viewContext: this.getParams().viewContext
  	    }}
        onClick={this.handleSubmit}
  	    className="btn-primary"
  	  >{ isEditing ? 'Save' : 'Edit' }</Link>;

      var title = isEditing ?
        <input
          id="title"
          ref="title"
          type="text"
          placeholder="Title"
          className="form-control"
          onChange={this.handleChange}
          value={titleText}
        /> :
        {titleText};

      var description = isEditing ?
        <textarea
          id="description"
          ref="description"
          className="form-control"
          onChange={this.handleChange}
          value={descriptionText}
        /> :
        {descriptionText};

      var time = moment(task.properties.created_on).format("dddd, MMMM Do YYYY, h:mm:ss a");

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
            <time className="comment-date" dateTime="16-12-2014 01:05">
              <i className="fa fa-clock-o"></i> {time}
            </time>

            <h4>{title}</h4>

            <blockquote>
              <p>{description}</p>
            </blockquote>

            {profileLink}
          </div>
        </div>
      );
    }
    else {
      return null;
    }
  }
});

module.exports = Task;
