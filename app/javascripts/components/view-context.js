'use strict';

var React = require('react'),
    Router = require('react-router'),
    { RouteHandler } = Router,
    PureRenderMixin = React.addons.PureRenderMixin,
    Header = require('./includes/header');

var ViewContext = React.createClass({
  mixins: [
    Router.State,
    PureRenderMixin
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
      var viewing = this.getParams().viewContext;

      this.props.fbRef
        .child(this.props.user.key + '/properties/is_viewing')
        .set('sb:' + viewing);

      this.props.fbRef
        .child('sb:' + viewing)
        .once('value', function(viewContextSnapshot) {
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
