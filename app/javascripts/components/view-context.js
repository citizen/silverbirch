'use strict';

var React = require('react'),
    Router = require('react-router'),
    { RouteHandler } = Router,
    Header = require('./includes/header');

var ViewContext = React.createClass({
  mixins: [
    Router.State
  ],

  getInitialState: function () {
    return {
      viewContextObject: null
    };
  },

  componentWillMount: function () {
    this.updateViewing();
  },

  componentWillReceiveProps: function () {
    this.updateViewing();
  },

  updateViewing: function () {
    if (this.props.user) {
      this.props.fbRef.child(this.props.user.sbid + '/is_viewing').set('sb:' + this.getParams().viewContext);

      this.props.fbRef.child('sb:'+this.getParams().viewContext).once('value', function(viewContextSnapshot) {
	this.setState({
	  viewContextObject: viewContextSnapshot.val()
	});
      }.bind(this));
    }
  },

  render: function() {
    return (
      <div>
        <Header
	  viewContext={this.state.viewContextObject}
          {...this.props}
        />
        <RouteHandler
	  viewContext={this.state.viewContextObject}
          {...this.props}
        />
      </div>
    );
  }
});

module.exports = ViewContext;
