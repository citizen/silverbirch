'use strict';

var React = require('react/addons'),
    Router = require('react-router'),
    { Link } = Router,
    TaskControls = require('./task-controls'),
    moment = require('moment');

var TaskTreeItem = React.createClass({
  getInitialState: function () {
    return {
      userInfo: null,
      taskExpanded: false
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

  expandToggle: function (event) {
    this.setState({
      taskExpanded: !this.state.taskExpanded
    })
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

    var description = (this.state.taskExpanded) ?
        <p>{task.properties.has_meta.description}</p> : '';

    var viewContextName = (this.props.viewContext) ?
          this.props.viewContext.properties.sbid.split(":")[1] : "";

    var metaData = (this.state.taskExpanded) ?
      <header className="text-left">
        <time className="comment-date" dateTime="16-12-2014 01:05"><i className="fa fa-clock-o"></i> {time}</time>
      </header> : '';

    return (
      <section className="wrap-left-column">
        <article className="left-column">
          {/*<Link to="task" params={{viewContext: viewContextName, taskId: task.key}}>*/}
          <div className="container" onClick={this.expandToggle}>
            <div id="overlay">
              {profileLink}
            </div>
            <div id="base">
              <div className="task-box-info">
                <div className="assignees">
                  <i className="fa fa-user"></i>
                </div>
                {/*<TaskControls task={task} {...this.props} />*/}

                <div className={classes}>
                  <h4>{task.properties.has_meta.title}</h4>
                  {description}
                </div>

                {metaData}
              </div>
              {taskTree}
            </div>
          </div>
          {/*</Link>*/}
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
