/** @jsx React.DOM */
/* jshint scripturl:true */

var BaseButton = React.createClass({
  render: function() {
    return this.transferPropsTo(
      <a href="javascript:;" role="button" className="btn">
	{this.props.children}
      </a>
    );
  }
});

var TaskList = React.createClass({
  render: function() {
    var createItem = function(item, index) {
      return [
	<dt key={ index }>{ item.title }</dt>,
	<dd>{ item.description }</dd>
      ];
    };
    return <dl className="dl-horizontal">{ this.props.tasks.map(createItem) }</dl>;
  }
});

var BaseModal = React.createClass({
  componentDidMount: function () {
    $(this.getDOMNode())
      .modal({backdrop: 'static', keyboard: false, show: false});
  },

  componentWillUnmount: function() {
    $(this.getDOMNode()).off('hidden', this.handleHidden);
  },

  close: function() {
    $(this.getDOMNode()).modal('hide');
  },

  open: function() {
    $(this.getDOMNode()).modal('show');
  },

  render: function () {
    var confirmButton = null;
    var cancelButton = null;

    if (this.props.confirm) {
      confirmButton = (
	  <BaseButton
	  onClick={this.handleConfirm}
	  className="btn-primary">
	  {this.props.confirm}
	</BaseButton>
      );
    }

    if (this.props.cancel) {
      cancelButton = (
	<BaseButton onClick={this.handleCancel} className="btn-default">
	  {this.props.cancel}
	</BaseButton>
      );
    }

    return (
      <div className="modal fade">
	<div className="modal-dialog">
	  <div className="modal-content">
	    <div className="modal-header">
	      <button
		type="button"
		className="close"
		onClick={this.handleCancel}>
		x
	      </button>
	      <h3>{this.props.title}</h3>
	    </div>
	    <div className="modal-body">
	      {this.props.children}
	    </div>
	    <div className="modal-footer">
	      {cancelButton}
	      {confirmButton}
	    </div>
	  </div>
	</div>
      </div>
    );
  },

  handleCancel: function() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  },

  handleConfirm: function() {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }
});

/**
 * Global app component
 */
var TaskApp = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function() {
    return {
      tasks: [],
      data: {
	title: "",
	description: ""
      }
    };
  },

  componentWillMount: function() {
    var db = new Firebase("https://jkilla.firebaseio.com/tasks/");
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
	description: this.state.description
      });

      this.setState({
	title: "",
	description: ""
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

React.renderComponent(<TaskApp />, document.getElementById("app"));
