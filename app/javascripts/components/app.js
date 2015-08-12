'use strict';

var _ = require('lodash'),
    React = require('react'),
    Router = require('react-router'),
    { RouteHandler } = Router,
    SbFbGraph = require('./sbFbGraph'),
    Header = require('./includes/header');

var App = React.createClass({
  mixins: [
    Router.State,
    Router.Navigation
  ],

  getInitialState: function () {
    return {
      user: null,
      graph: {}
    };
  },

  componentDidMount: function () {
    this.props.fbRef.onAuth(function (auth) {
      if(auth) {
        // user is logged in, sync graph
        SbFbGraph(this.props.fbRef, auth.uid, this.setGraph);
      }
      else {
        // user is logged out, redirect to login
        this.transitionTo('login');
      }
    }, this);
  },

  setGraph: function (sbGraph, node) {
    if (node.properties.is_type === 'user') {
      this.setUser(node);
    }

    this.setState({
      graph: sbGraph
    });

    this.forceUpdate();

  },

  setUser: function (userData) {
    this.setState({
      user: userData
    });
  },

  render: function () {
    return (
      <div>
        <Header
          user={this.state.user}
          graph={this.state.graph}
          {...this.props} />
	<span className="menu-btn left" id="left-menu">Left Menu</span>
	<span className="menu-btn right" id="right-menu">Right Menu</span>
        <RouteHandler
          user={this.state.user}
          graph={this.state.graph}
          {...this.props} />
      </div>
    );
  }
});

module.exports = App;
