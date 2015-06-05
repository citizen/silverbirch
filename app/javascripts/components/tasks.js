'use strict';

var _ = require('lodash'),
    React = require('react'),
    Router = require('react-router'),
    { Link, RouteHandler } = Router,
    Menu = require('./menu'),
    TaskTree = require('./task-tree'),
    Authentication = require('./auth');

var Tasks = React.createClass({
  mixins: [
    Router.State,
    Authentication
  ],

  render: function() {
    // var leftMenuItems = [
    //   "SilverBirch",
    //   "WebOps"
    // ];

    // var rightMenuItems = [
    //   "rpowis",
    //   "jsuarez",
    //   "tommyvn",
    //   "chrisk2020",
    //   "anguspaterson"
    // ];

    var viewContextName = (this.props.viewContext)
          ? this.props.viewContext.properties.sbid.split(":")[1]
          : "";

        // <Menu position="left" title="Teams" menuItems={leftMenuItems} />
        // <Menu position="right" title="Members" menuItems={rightMenuItems} />
    return (
      <div className="container-fluid">
        <div className="col-md-6">
          <TaskTree {...this.props} />
        </div>
        <div className="col-md-6">
          <Link to="newTask" params={{viewContext: viewContextName}} className="btn btn-primary glyphicon glyphicon-plus"></Link>
          <RouteHandler {...this.props} />
        </div>
      </div>
    );
  }
});

module.exports = Tasks;
