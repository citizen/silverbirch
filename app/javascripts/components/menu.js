'use strict';

var React = require('react'),
    Router = require('react-router');

var Menu = React.createClass({
  openMenu: function (e) {
    console.log(e);
    var className = 'focus',
        menu = document.getElementById('menu-'+this.props.position);

    if (menu.classList)
      menu.classList.add(className);
    else
      menu.className += ' ' + className;
  },

  closeMenu: function (e) {
    var className = 'focus',
        menu = document.getElementById('menu-'+this.props.position);

    if (menu.classList)
      menu.classList.remove(className);
    else
      menu.className = menu.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    },

	render: function() {
    var id = "menu-" + this.props.position,
        posClass = "animate menu menu-" + this.props.position;

		return (
      <div>
        <nav className={posClass} id={id}>
            <ul>
                <li>
                    <a href="">on twitter</a>
                </li>
                <li>
                    <a href="">Learn More about me on Facebook</a>
                </li>
                <li>
                    <a href="">Snippets</a>
                </li>
                <li>
                    <a href="">Projects</a>
                </li>
                <li>
                    <a href="">Résumé</a>
                </li>
            </ul>
        </nav>
        <div className="nav-controller">
            <span onClick={this.openMenu} className="[ glyphicon glyphicon-chevron-left ] controller-open"></span>
            <span onClick={this.closeMenu} className="[ glyphicon glyphicon-remove ] controller-close"></span>
        </div>
      </div>
		);
	}
});

module.exports = Menu;
