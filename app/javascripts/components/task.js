"use strict";

var React = require('react'),
    Router = require('react-router'),
    { Route, RouteHandler, Link } = Router,
    Authentication = require('./auth');

var Task = React.createClass({
  mixins: [
    Router.State,
    Authentication
  ],

  getInitialState: function () {
    return {
      task: {}
    };
  },

  componentWillReceiveProps: function() {
    this.loadTask();
  },

  componentDidMount: function () {
    this.loadTask();
  },

  loadTask: function() {
    var dbRef = this.props.fbRef,
	// TODO: pass this through from tasks.js as a prop
        taskId = this.getParams().taskId;

    dbRef.child(taskId).on('value', function(taskSnapshot) {
      this.setState({
        task: taskSnapshot.val()
      });
    }, this);
  },

  render: function () {
    var taskMeta = this.state.task.has_meta,
        title = taskMeta ? taskMeta.title : '',
        description = taskMeta ? taskMeta.description : '';

    return (
      <div className="panel panel-default col-md-6">
        <div className="panel-body">
          <h3>{ title }</h3>
          <p>{ description }</p>
        </div>
      </div>
    );
  }
});

module.exports = Task;
