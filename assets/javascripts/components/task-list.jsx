var React = require('../vendor/react/react');

var TaskList = React.createClass({
  render: function() {
    var createItem = function(item, index) {
      return [
        <dt key={ index }>{ item.title }</dt>,
        <dd>{ item.description }</dd>
      ];
    };

    return (
      <dl className="dl-horizontal">
        { this.props.tasks.map(createItem) }
      </dl>
    );
  }
});

module.exports = TaskList;
