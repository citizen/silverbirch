"use strict";

var fb = require('firebase'),
    Login = require('./login'),
    config = require('./../config');

var auth = {
  loggedIn: function () {
    var db = new fb(config.db);
    return !!db.getAuth();
  }
};

var Authentication = {
  statics: {
    willTransitionTo: function (transition) {
      if (!auth.loggedIn()) {
        Login.attemptedTransition = transition;
        // NOTE: if we ever have publicly visible tasks, redirect to '/tasks'
        transition.redirect('/login');
      }
    }
  }
};

module.exports = Authentication;
