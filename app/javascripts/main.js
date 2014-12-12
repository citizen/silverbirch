'use strict';

require('firebase');

var React = require('react'),
    Router = require('react-router'),
    ReactFireMixin  = require('reactfire'),
    { Route, RouteHandler, Link } = Router;

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
  login: function (email, pass, cb) {
    cb = arguments[arguments.length - 1];
    if (localStorage.token) {
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
    delete localStorage.token;
    if (cb) { cb(); }
    this.onChange(false);
  },

  loggedIn: function () {
    return !!localStorage.token;
  },

  onChange: function () {}
};

var App = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function () {
    return {
      loggedIn: auth.loggedIn()
    };
  },

  setStateOnAuth: function (loggedIn) {
    this.setState({
      loggedIn: loggedIn
    });
  },

  componentWillMount: function () {
    // this.tasks = [];
    // this.firebaseRef = new Firebase("https://jkilla.firebaseio.com/tasks");
    // this.firebaseRef.on("child_added", function(dataSnapshot) {
    //   this.tasks.push(dataSnapshot.val());
    //   this.setState({
    //     tasks: this.tasks
    //   });
    // }.bind(this));

    auth.onChange = this.setStateOnAuth;
    auth.login();
  },

  render: function () {
    var loginOrOut = this.state.loggedIn ?
      <Link to="logout">Sign out</Link> :
      <Link to="login">Sign in</Link>;
    return (
      <div>
        <ul>
          <li>{loginOrOut}</li>
          <li><Link to="tasks">Tasks</Link></li>
          <li><Link to="dashboard">Dashboard</Link> (authenticated)</li>
        </ul>
        <RouteHandler/>
      </div>
    );
  }
});

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

var Dashboard = React.createClass({
  mixins: [ Authentication ],

  render: function () {
    var token = auth.getToken();
    return (
      <div>
        <h1>Dashboard</h1>
        <p>You made it!</p>
        <p>{token}</p>
      </div>
    );
  }
});

var Login = React.createClass({
  mixins: [ Router.Navigation ],

  statics: {
    attemptedTransition: null
  },

  getInitialState: function () {
    return {
      error: false
    };
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var email = this.refs.email.getDOMNode().value;
    var pass = this.refs.pass.getDOMNode().value;
    auth.login(email, pass, function (loggedIn) {
      if (!loggedIn)
        return this.setState({ error: true });

      if (Login.attemptedTransition) {
        var transition = Login.attemptedTransition;
        Login.attemptedTransition = null;
        transition.retry();
      } else {
        this.replaceWith('/tasks');
      }
    }.bind(this));
  },

  render: function () {
    var errors = this.state.error ? <p>Bad login information</p> : '';
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input ref="email" placeholder="email" defaultValue="joe@example.com"/></label>
        <label><input ref="pass" placeholder="password"/></label> (hint: password1)<br/>
        <button type="submit">login</button>
        {errors}
      </form>
    );
  }
});

var Tasks = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function () {
    return {
      tasks: []
    };
  },

  componentWillMount: function () {
    this.bindAsArray(new Firebase("https://jkilla.firebaseio.com/tasks/"), "tasks");
  },

  render: function() {
    var createItem = function(item, index) {
      return (
        <a className="task" key={ index }>
          <h3>{ item.title }</h3>
          <span>{ item.description }</span>
        </a>
      );
    };

    return (
      <div className="task-list">
        { this.state.tasks.map(createItem) }
      </div>
    );
  }
});

var Logout = React.createClass({
  componentDidMount: function () {
    auth.logout();
  },

  render: function () {
    return <p>You are now logged out</p>;
  }
});

var routes = (
  <Route handler={App}>
    <Route name="login" handler={Login}/>
    <Route name="logout" handler={Logout}/>
    <Route name="tasks" handler={Tasks}/>
    <Route name="dashboard" handler={Dashboard}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
