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
    var leftMenuItems = [
      "SilverBirch",
      "WebOps"
    ];

    var rightMenuItems = [
      "rpowis",
      "jsuarez",
      "tommyvn",
      "chrisk2020",
      "anguspaterson"
    ];

    var viewContextName = this.getParams().viewContext;

    var path = this.getPathname().split('/').pop();
    var toggleRoute = (path === 'new') ? 'tasks' : 'newTask';

    return (



      <div className="wrap-task">

            <div id="sidr">
              /*-- Your content --*/
              <ul>
                <li><a href="#">List 1</a></li>
                <li class="active"><a href="#">List 2</a></li>
                <li><a href="#">List 3</a></li>
              </ul>
            </div>

        <div className="left-column">
          <TaskTree {...this.props} />
        </div>


        <Link to={toggleRoute} params={{viewContext: viewContextName}} className="btn-primary new-task-btn">
          <img src="/images/circle_add_plus.png" width="50" height="50" alt=""/>
        </Link>

        <RouteHandler {...this.props} />
    	</div>
    );
  }
});

module.exports = Tasks;
