/* jshint scripturl:true */
var React = require('../vendor/react/react');

var BaseButton = React.createClass({
  render: function() {
    return this.transferPropsTo(
      <a href="javascript:;" role="button" className="btn">
        {this.props.children}
      </a>
    );
  }
});

module.exports = BaseButton;
