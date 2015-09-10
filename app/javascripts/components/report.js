'use strict';

var _ = require('lodash'),
    React = require('react'),
    Router = require('react-router');

var Profile = React.createClass({
  mixins: [
    Router.State
  ],

  componentWillMount: function() {
    this.getUser();
  },

  componentWillReceiveProps: function() {
    this.getUser();
  },

  getUser: function() {
    var userData = {},
        user = this.props.viewContext ? this.props.viewContext : {};

    userData.email = (user.email) ? user.email : '';
    userData.avatar = (user.avatar) ? user.avatar : '';
    userData.username = (user.username) ? user.username : '';
    userData.displayName = (user.displayName) ? user.displayName : '';

    this.setState({
      user: userData
    });
  },

  render: function() {
    return (
      <div className="board">

      <div className="to-do">
      <div className="title">To Do</div>
      <div className="title">Average Complete Time</div>
      <div className="title">Overhang</div>
      <div className="box">
            <div className="small-box-item">
                Small (80%)
            </div>
            <div className="medium-box-item">
                Medium (30%)
            </div>
            <div className="large-box-item">
                Large (50%)
            </div>
      </div>
      </div>

      <div className="in-progress">
      <div className="title">In Progress</div>
      <div className="">
            <div className="">
                Learn more about React
            </div>
      </div>
      </div>

      <div className="done">
      <div className="title">Done</div>
      <div className="">
            <div className="">
                Learn more about React
            </div>
      </div>
      </div>

      <div className="qa">
      <div className="title">QA</div>
      <div className="">
            <div className="">
                Learn more about React
            </div>
      </div>
      </div>

      </div>
    );
  }
});

module.exports = Profile;
