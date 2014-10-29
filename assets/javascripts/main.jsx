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
      tasks: [],
      data: {
      	title: "",
      	description: "",
        created: 0
      }
    };
  },

  componentWillMount: function() {
    var db = new Firebase(config.db + "/tasks");
    this.bindAsArray(db, "tasks");
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
    var modal = null;
    modal = (
      <BaseModal
      	ref="modal"
      	confirm="Do it!"
      	cancel="Cancel"
      	onCancel={this.closeModal}
      	onConfirm={this.handleSubmit}
      	title="Create a new task">
    	  <form onSubmit={ this.handleSubmit } role="form">
    	    <div className="form-group">
    	      <label htmlFor="title">Title</label>
    	      <input type="text" id="title" className="form-control" onChange={ this.updateTitle } value={ this.state.title } />
    	    </div>
    	    <div className="form-group">
    	      <label htmlFor="description">Description</label>
    	      <input type="text" id="description" className="form-control" onChange={ this.updateDescription } value={ this.state.description } />
    	    </div>
    	    {/* TODO: handle submitting the form with enter key */}
    	  </form>
      </BaseModal>
    );

    return (
      <div>
      	{modal}
      	<BaseButton onClick={this.openModal} className="btn-default">
      	  New task
      	</BaseButton>
      	<TaskList tasks={ this.state.tasks } />
      </div>
    );
  }
});

(function () {
  React.renderComponent(<TaskApp />, document.getElementById("app"));
})();
