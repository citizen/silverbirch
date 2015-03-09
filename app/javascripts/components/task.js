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

  render: function () {
    var task = this.props.task,
        taskMeta = task.has_meta ? task.has_meta : null,
        title = taskMeta ? taskMeta.title : '',
        description = taskMeta ? taskMeta.description : '';

    var editLink = "";
    // var editLink = task.uid ?
    //       <Link
    //         to="editTask"
    //         params={{taskId: this.props.task.uid}}
    //         className="glyphicon glyphicon-edit pull-right btn btn-default"
    //       ></Link> : '';

    var profileLink = "";
    // var profileLink = (this.props.user) ?
    //       <Link to="profile" params={{username: this.props.user.username}}>
    //         <img className="avatar" src={this.props.user.avatar} />
    //         <span>{this.props.user.username}</span>
    //       </Link> : '';

    return (
      <div className="panel panel-default col-md-6">
        {editLink}

        <div className="panel-body">
          <h3>{ title }</h3>

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
