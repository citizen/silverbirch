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
      <div className="container">
        <div className="row">
          <div className="col-md-6 no-pad">
            <div className="user-pad">
                <h3>Welcome back, {this.state.user.displayName}</h3>
                <h4 className="white"><i className="fa fa-check-circle-o"></i> London, UK</h4>
                <h4 className="white"><i className="fa fa-twitter"></i> jeremyjsuarez</h4>
                <h4>Email: {this.state.user.email}</h4>

                <button type="button" className="btn btn-labeled btn-info" href="#">
                  <span className="btn-label"><i className="fa fa-pencil"></i></span>Update
                </button>
            </div>
          </div>

          <div className="col-md-6 no-pad">
            <div className="user-image">
              <img className="img-responsive img-rounded" src={this.state.user.avatar} />
            </div>
          </div>
        </div>

        <div className="row overview">
          <div className="col-md-4 user-pad text-center">
            <h3>FOLLOWERS</h3>
            <h4>2,784</h4>
          </div>

          <div className="col-md-4 user-pad text-center">
            <h3>FOLLOWING</h3>
            <h4>456</h4>
          </div>

          <div className="col-md-4 user-pad text-center">
            <h3>APPRECIATIONS</h3>
            <h4>4,901</h4>
          </div>
        </div>

        <div className="col-md-1 user-menu-btns">
          <div className="btn-group-vertical square" id="responsive">
            <a href="#" className="btn btn-block btn-default active">
              <i className="fa fa-bell-o fa-3x"></i>
            </a>

            <a href="#" className="btn btn-default">
              <i className="fa fa-envelope-o fa-3x"></i>
            </a>

            <a href="#" className="btn btn-default">
              <i className="fa fa-laptop fa-3x"></i>
            </a>

            <a href="#" className="btn btn-default">
              <i className="fa fa-cloud-upload fa-3x"></i>
            </a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Profile;
