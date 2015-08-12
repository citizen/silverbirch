'use strict';

var React = require('react'),
    Router = require('react-router'),
    { RouteHandler } = Router,
    SubHeader = require('./includes/subheader');

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
        .set('sb:' + viewing, function() {
        	this.setState({
        	  viewContextObject: this.props.graph['sb:' + viewing]
        	});
        }.bind(this));
    }
  },

  render: function() {
    var teamMembersList = '';

    if (
      this.state.viewContextObject &&
      this.state.viewContextObject.properties &&
      this.state.viewContextObject.properties.is_type === 'team'
    ) {
      var team = this.state.viewContextObject.key,
          teamMembers = this.props.graph[team].relationships.has_users;

      teamMembersList = <SubHeader members={teamMembers} {...this.props}/>;
    }

    return (
      <div>
        { teamMembersList }
        <RouteHandler
          viewContext={this.state.viewContextObject}
          {...this.props} />
      </div>
    );
  }
});

module.exports = ViewContext;
