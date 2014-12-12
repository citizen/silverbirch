'use strict';

require('firebase');

var React = require('react'),
    ReactFireMixin  = require('reactfire'),
    Authentication = require('./auth').Authentication;

var Tasks = React.createClass({
  mixins: [
    Authentication,
    ReactFireMixin
  ],

  getInitialState: function () {
    return {
      tasks: []
    };
  },

  componentWillMount: function () {
    this.bindAsArray(new Firebase("https://jkilla.firebaseio.com/tasks/"), "tasks");
  },

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
        { this.state.tasks.map(createItem) }
      </div>
    );
  }
});

module.exports = Tasks;
