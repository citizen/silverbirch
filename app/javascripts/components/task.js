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
    if( this.props.task && 'properties' in this.props.task ) {
      var task = this.props.task,
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
    else {
      return null;
    }
  }
});

module.exports = Task;
