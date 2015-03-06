'use strict';

var React = require('react'),
    Router = require('react-router'),
    { RouteHandler } = Router,
    Header = require('./includes/header');

var ViewContext = React.createClass({
  mixins: [
    Router.State
  ],

  componentWillMount: function () {
    this.updateViewing();
  },

  componentWillReceiveProps: function () {
    this.updateViewing();
  },

  updateViewing: function () {
    if (this.props.user) {
      this.props.fbRef.child(this.props.user.sbid + '/is_viewing').set('sb:' + this.getParams().viewContext);
    }
  },

  render: function() {
    return (
      <div>
        <Header
          viewContext={this.getParams().viewContext}
          {...this.props}
        />
        <RouteHandler
          viewContext={this.getParams().viewContext}
          {...this.props}
        />
      </div>
    );
  }
});

module.exports = ViewContext;
