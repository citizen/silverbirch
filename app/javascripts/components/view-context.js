'use strict';

var React = require('react'),
    Router = require('react-router'),
    { RouteHandler } = Router;

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
    // TODO: only do this if the view context changes
    if (this.props.user) {
      var viewing = this.getParams().viewContext;

      // persist viewing context change to firebase
      this.props.fbRef
        .child(this.props.user.key + '/properties/is_viewing')
        .set('sb:' + viewing);

    	this.setState({
    	  viewContextObject: this.props.graph['sb:' + viewing]
    	});
    }
  },

  render: function() {
    return (
      <RouteHandler
        viewContext={this.state.viewContextObject}
        {...this.props} />
    );
  }
});

module.exports = ViewContext;
