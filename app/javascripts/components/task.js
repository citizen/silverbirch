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

    var editLink = task.uid ?
        <Link
          to="editTask"
          params={{taskId: this.props.task.uid}}
          className="glyphicon glyphicon-edit pull-right"
        ></Link> : '';

    return (
      <div className="panel panel-default col-md-6">
        {editLink}
        <div className="panel-body">
          <h3>{ title }</h3>
          <blockquote>
            <p>{ description }</p>
          </blockquote>
        </div>
      </div>
    );
  }
});

module.exports = Task;
