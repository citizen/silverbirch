var $           = require('../vendor/jquery/jquery'),
    React       = require('../vendor/react/react'),
    BaseButton  = require('../components/base-button');

// TODO: remove bootstrap
require('../vendor/bootstrap-sass/bootstrap');

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

module.exports = BaseModal;
