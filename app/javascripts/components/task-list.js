var React = require('react');

var TaskList = React.createClass({
  render: function() {
    var taskNodes = this.props.tasks.map(function(task) {
      return (
        <h3 className="taskList">
          {task.title}
        </h3>
      );
    });
    return (
      <div className="taskList">
        {taskNodes}
      </div>
    );
  }
});

module.exports = TaskList;
