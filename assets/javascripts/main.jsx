require('./vendor/firebase/firebase');

var config          = require('./config'),
    React           = require('./vendor/react/react'),
    ReactFireMixin  = require('./vendor/reactfire/reactfire'),
    BaseButton      = require('./components/base-button'),
    BaseModal       = require('./components/base-modal'),
    TaskList        = require('./components/task-list');

var TaskApp = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function() {
    return {
      auth: false,
      tasks: [],
      data: {
      	title: "",
      	description: "",
        created: 0
      }
    };
  },

  componentWillMount: function() {
    var db = new Firebase(config.db + "/tasks"),
        self = this;

    db.onAuth(function(authData) {
      if (authData) {
        // user authenticated with Firebase
        // console.log("User: ", authData);

        self.setState({
          auth: true
        });
      } else {
        // user is logged out
        console.log('logged out');
      }
    });

    this.bindAsArray(db, "tasks");
  },

  auth: function() {
    // TODO: avoid having to rescope 'this'
    var self = this,
        db = this.firebaseRefs.tasks,
        isAuth = db.getAuth();

    if ( isAuth ) {
      // logged out
      this.setState({
        auth: false
      });
      db.unauth();
    }
    else {
      db.authWithOAuthPopup("github", function(err, authData) {
        if (err) {
          console.log(err, 'error');
        } else if (authData) {
          // logged in!
          self.createUser(authData.uid, authData);

          self.setState({
            auth: true
          });
        }
      });
    }
  },

  createUser: function (userId, userData) {
    var self = this,
        usersRef = new Firebase(config.db + "/users");

    usersRef.child(userId).transaction(function(currentUserData) {
      if (currentUserData === null) {
        delete userData.auth;
        delete userData.token;
        delete userData.expires;
        delete userData[userData.provider].accessToken;
        return userData;
      }
    }, function(error, committed) {
      self.userCreated(userId, committed);
    });
  },

  userCreated: function (userId, success) {
    if (!success) {
      console.log('user ' + userId + ' already exists!');
    } else {
      console.log('Successfully created ' + userId);
    }
  },

  updateTitle: function(e) {
    this.setState({title: e.target.value});
  },

  updateDescription: function(e) {
    this.setState({description: e.target.value});
  },

  handleSubmit: function(e) {
    // TODO: fix e.preventDefault() for <a> click
    if (this.state.title && this.state.title.trim().length !== 0) {
      this.firebaseRefs.tasks.push({
      	title: this.state.title,
      	description: this.state.description,
        created: Date.now()
      });

      this.setState({
      	title: "",
      	description: "",
        created: 0
      });

      this.closeModal();
    }
  },

  openModal: function(e) {
    event.preventDefault();
    this.refs.modal.open();
  },

  closeModal: function() {
    this.refs.modal.close();
  },

  render: function() {
    var modal = null,
        authbutton = null;

    modal = (
      <BaseModal
        ref="modal"
        confirm="Do it!"
        cancel="Cancel"
        onCancel={ this.closeModal }
        onConfirm={ this.handleSubmit }
        title="Create a new task">
        <form onSubmit={ this.handleSubmit } role="form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              className="form-control"
              onChange={ this.updateTitle }
              value={ this.state.title }
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              className="form-control"
              onChange={ this.updateDescription }
              value={ this.state.description }
            />
          </div>
          {/* TODO: handle submitting the form with enter key */}
        </form>
      </BaseModal>
    );

    if ( this.state.auth ) {
      authButton = (
        <div>
          <div id="actions">
            <BaseButton onClick={this.auth} className="btn-primary">
              Log out
            </BaseButton>
            <BaseButton onClick={this.openModal} className="btn-default">
              New task
            </BaseButton>
          </div>
            {modal}
            <TaskList tasks={ this.state.tasks } />
        </div>
      );
    }
    else {
      authButton = (
        <div>
          <div id="actions">
            <BaseButton onClick={this.auth} className="btn-primary">
              Log in
            </BaseButton>
          </div>
        </div>
      );
    }

    return authButton;
  }
});

(function () {
  React.renderComponent(<TaskApp />, document.getElementById("app"));
})();
