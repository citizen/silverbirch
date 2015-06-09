'use strict';

var React = require('react'),
    Router = require('react-router'),
    { Link } = Router;

var TaskControls = React.createClass({
  mixins: [
    Router.State
  ],

  archiveTask: function () {
    this.props.fbRef.child(this.props.task.key + '/properties').update({
      'has_state': 'archived'
    });
  },

  render: function() {
    return (
      <div>
        {/*<Link
                  to="newChildTask"
                  params={{
                    taskId: this.props.task.uid,
                    viewContext: this.getParams().viewContext
                  }}
                  className="btn-primary"
                ></Link>*/}
        <span
          onClick={this.archiveTask}
          className="btn-primary-archive"
        >
        </span>
      </div>
    );
  }
});

module.exports = TaskControls;
