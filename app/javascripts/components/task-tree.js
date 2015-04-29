'use strict';

var React = require('react/addons'),
    Router = require('react-router'),
    { Link } = Router,
    TaskControls = require('./task-controls'),
    moment = require('moment');

var TaskTreeItem = React.createClass({
  render: function() {
    var task = this.props.task,
      	cx = React.addons.classSet,
      	taskTree = (task.children) ? <TaskTree tasks={task.children} fbRef={this.props.fbRef} /> : '';

    var classes = cx({
      'archived': task.has_state === 'archived',
      'comment-post': true
    });

      var profileLink = (this.props.user) ?
           <div className="thumbnail">
             <img className="img-responsive" src={this.props.user.avatar} />
             <figcaption className="text-center">{this.props.user.username}</figcaption>
           </div> : '';

    var time = moment(task.created_on).format("dddd, MMMM Do YYYY, h:mm:ss a");

    var viewContextName = (this.props.viewContext) ?
          this.props.viewContext.sbid.split(":")[1] : "";

    return (
      <section className="comment-list">
        <article className="row">
          <div className="col-md-2 col-sm-2 hidden-xs">
            {profileLink}
          </div>

          <div className="col-md-10 col-sm-10">
            <div className="task-panel panel panel-default arrow left">
              <div className="panel-body">
                <TaskControls task={task} {...this.props} />

                <header className="text-left">
                  <div className="comment-user"><i className="fa fa-user"></i> Assignee</div>
                  <time className="comment-date" dateTime="16-12-2014 01:05"><i className="fa fa-clock-o"></i> {time}</time>
                </header>

                <div className={classes}>
            		  <h4>
                    <Link to="task" params={{viewContext: viewContextName, taskId: task.uid}}>
                      {task.has_meta.title}
                    </Link>
            		  </h4>
                  <p>{task.has_meta.description}</p>
                </div>

                <p className="text-right"><a href="#" className="btn btn-default btn-sm"><i className="fa fa-reply"></i> reply</a></p>
              </div>

              {taskTree}
            </div>
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

      if (!Object.keys(task).length || task.archived) { return null; }
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
