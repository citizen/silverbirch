'use strict';

var React = require('react'),
    Router = require('react-router'),
    NewMemberDropdown = require('./new-member-dropdown');

var SubHeader = React.createClass({
  mixins: [
    Router.State
  ],

  getInitialState: function () {
    return {
      dropdownVisible: false
    };
  },

  filterTeams: function(member) {
    return this.props.members[member].properties
            ? this.props.members[member].properties.is_type === 'user'
            : false;
  },

  displayMember: function(member) {
    var memberData = this.props.members[member].properties;

    return (
      <div className="teamList__member" key={memberData.username}>
        <img alt="@jsa" className="teamList_avatar" src={memberData.avatar}/>
        <span className="teamList__member__display-name">{memberData.displayName}</span>
        <span className="teamList__member__username">({memberData.username})</span>
      </div>
    );
  },

  toggleDropdown: function(event) {
    event.preventDefault();
    this.setState({
      dropdownVisible: !this.state.dropdownVisible
    });
  },

  render: function() {
    var teamList = Object.keys(this.props.members)
                        .filter(this.filterTeams)
                        .map(this.displayMember);

    var dropdown = this.state.dropdownVisible
                    ? <NewMemberDropdown
                        fbRef={this.props.fbRef}
                        {...this.props} />
                    : false;

    teamList.push(
      <div
        className="btn new-member-btn"
        onClick={this.toggleDropdown}
        key="button"
      >
        <img src="/images/circle_add_plus.png"/>
        { dropdown }
      </div>
    );

    return (
      <div className="teamList subheader">
        { teamList }
      </div>
    )
  }
});

module.exports = SubHeader;
