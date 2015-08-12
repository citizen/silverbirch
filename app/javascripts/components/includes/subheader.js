'use strict';

var React = require('react'),
    Router = require('react-router');

var SubHeader = React.createClass({
  mixins: [
    Router.State
  ],

  filterTeams: function(member) {
    return this.props.members[member].properties.is_type === 'user';
  },

  displayMember: function(member) {
    var memberData = this.props.members[member].properties;

    return (
      <div className="teamList__member" key={memberData.username}>
        <img className="teamList__member__img" src={memberData.avatar}/>
        <span className="teamList__member__display-name">{memberData.displayName}</span>
        <span className="teamList__member__username">({memberData.username})</span>
      </div>
    );
  },

  render: function() {
    var teamList = Object.keys(this.props.members)
                        .filter(this.filterTeams)
                        .map(this.displayMember);

    return (
      <div className="teamList subheader">
        { teamList }
      </div>
    )
  }
});

module.exports = SubHeader;
