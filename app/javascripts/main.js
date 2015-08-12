'use strict';

var fb = require('firebase'),
    React = require('react'),
    Router = require('react-router'),
    config = require('./config'),
    routes = require('./routes');

Router.run(routes, (Handler, State) => {
  var fbRef = new fb(config.db);
  React.render(<Handler fbRef={fbRef} />, document.getElementById('app'));
});

