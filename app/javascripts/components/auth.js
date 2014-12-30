require("firebase");

var Login = require('./login'),
    config = require('./../config');

function pretendRequest(email, pass, cb) {
  setTimeout(function () {
    if (email === 'joe@example.com' && pass === 'password1') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7),
      });
    } else {
      cb({authenticated: false});
    }
  }, 0);
}

// Fake authentication lib
var auth = {
  login: function (cb) {
    if (this.loggedIn) {
      if (cb) { cb(true); }
      this.onChange(true);
      return;
    }

    pretendRequest(email, pass, function (res) {
      if (res.authenticated) {
        localStorage.token = res.token;
        if (cb) { cb(true); }
        this.onChange(true);
      } else {
        if (cb) { cb(false); }
        this.onChange(false);
      }
    }.bind(this));
  },

  getToken: function () {
    return localStorage.token;
  },

  logout: function (cb) {
    var db = new Firebase(config.db);
    db.unauth();

    if (cb) { cb(); }
    this.onChange(false);
  },

  loggedIn: function () {
    var db = new Firebase("https://jkilla.firebaseio.com"),
        isAuth = db.getAuth() !== null;

    return isAuth;
  },

  onChange: function () {}
};

var Authentication = {
  statics: {
    willTransitionTo: function (transition) {
      if (!auth.loggedIn()) {
        Login.attemptedTransition = transition;
        transition.redirect('/login');
      }
    }
  }
};

module.exports = {
  auth,
  Authentication
};
