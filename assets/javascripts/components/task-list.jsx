var React = require('../vendor/react/react');

var TaskList = React.createClass({
  render: function() {
    var createItem = function(item, index) {
      return (
        <a className="task" key={ index }>
          <h3>{ item.title }</h3>
          <span>{ item.description }</span>
        </a>
      );
    };

    return (
      <div className="task-list">
        { this.props.tasks.map(createItem) }
      </div>
    );
  }
});

module.exports = TaskList;
