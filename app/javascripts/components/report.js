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

            <h1>Simple Pure CSS Drop Down Menu</h1>
<nav id="primary_nav_wrap">
<ul>
  <li class="current-menu-item"><a href="#">Home</a></li>
  <li><a href="#">Menu 1</a>
    <ul>
      <li><a href="#">Sub Menu 1</a></li>
      <li><a href="#">Sub Menu 2</a></li>
      <li><a href="#">Sub Menu 3</a></li>
      <li><a href="#">Sub Menu 4</a>
        <ul>
          <li><a href="#">Deep Menu 1</a>
            <ul>
              <li><a href="#">Sub Deep 1</a></li>
              <li><a href="#">Sub Deep 2</a></li>
              <li><a href="#">Sub Deep 3</a></li>
                <li><a href="#">Sub Deep 4</a></li>
            </ul>
          </li>
          <li><a href="#">Deep Menu 2</a></li>
        </ul>
      </li>
      <li><a href="#">Sub Menu 5</a></li>
    </ul>
  </li>
  <li><a href="#">Contact Us</a></li>
</ul>
</nav>
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

      </div>
    );
  }
});

module.exports = Profile;
