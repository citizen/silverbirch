'use strict';

var React = require('react/addons'),
    Router = require('react-router'),
    { Link } = Router,
    TaskControls = require('./task-controls'),
    moment = require('moment');

var TaskTreeItem = React.createClass({
  getInitialState: function () {
    return {
      userInfo: null
    };
  },

  componentWillMount: function () {
    this.setCreator();
  },

  setCreator: function() {
    if (!this.props.task.created_by) { return false; };

    var user = this.props.task.created_by;

    this.props.fbRef.child(user).once('value', function (userSnapshot) {
      var userData = userSnapshot.val();

      this.setState({
        userInfo: userData
      });
    }.bind(this));
  },

  render: function() {
    var task = this.props.task,
      	cx = React.addons.classSet,
      	taskTree = (task.relationships.has_children) ?
          <TaskTree tasks={task.relationships.has_children} fbRef={this.props.fbRef} /> :
          '';

    var classes = cx({
      'archived': task.properties.has_state === 'archived',
      'comment-post': true
    });

    var profileLink = (this.props.user.properties.avatar) ?
        <div className="round">
          <img className="round" src={this.props.user.properties.avatar} />
        </div> : '';

    var time = moment(task.properties.created_on).format("dddd, MMMM Do YYYY, h:mm:ss a");

    var viewContextName = (this.props.viewContext) ?
          this.props.viewContext.properties.sbid.split(":")[1] : "";

    return (
      <section className="wrap-left-column">
        <article className="left-column">
          <div className="task-box">
            {profileLink}

            <div className="task-box">
              {/*<TaskControls task={task} {...this.props} />*/}

              <header className="text-left">
                <div className="comment-user"><i className="fa fa-user"></i> Assignee</div>
                <time className="comment-date" dateTime="16-12-2014 01:05"><i className="fa fa-clock-o"></i> {time}</time>
              </header>

              <div className={classes}>
          		  <h4>
            		  <Link to="task" params={{viewContext: viewContextName, taskId: task.key}}>
                    {task.properties.has_meta.title}
            		  </Link>
          		  </h4>

                <p>{task.properties.has_meta.description}</p>
              </div>

              <p className="text-right"><a href="#" className="btn btn-default btn-sm"><i className="fa fa-reply"></i> reply</a></p>
            </div>

            {taskTree}
          </div>
        </article>
      </section>
    );
  }
});

var TaskTree = React.createClass({
  mixins: [
    React.PureRenderMixin
  ],

  render: function() {
    var tasks = Object.keys(this.props.tasks).map(function (taskId) {
      var task = this.props.tasks[taskId];

      if (!Object.keys(task).length || task.properties.archived) { return null; }

      return <TaskTreeItem task={task} key={taskId} {...this.props} />;
    }.bind(this));

    return (
      <div>
        {tasks}
      </div>
    );
  }
});

module.exports = TaskTree;
