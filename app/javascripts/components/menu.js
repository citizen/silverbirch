'use strict';

var React = require('react'),
    Router = require('react-router');

var Menu = React.createClass({
  openMenu: function (e) {
    var className = 'focus',
        menu = document.getElementById('menu');

    if (menu.classList)
      menu.classList.add(className);
    else
      menu.className += ' ' + className;
  },

  closeMenu: function (e) {
    var className = 'focus',
        menu = document.getElementById('menu');

    if (menu.classList)
      menu.classList.remove(className);
    else
      menu.className = menu.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    },

	render: function() {
		return (
      <div>
        <nav className="animate menu" id="menu">
            <ul>
                <li>
                    <a href="https://twitter.com/mouse0270">@mouse0270 on twitter</a>
                </li>
                <li>
                    <a href="https://facebook.com/rem.mcintosh">Learn More about me on Facebook</a>
                </li>
                <li>
                    <a href="http://bootsnipp.com/mouse0270">Snippets</a>
                </li>
                <li>
                    <a href="https://github.com/mouse0270">Projects</a>
                </li>
                <li>
                    <a href="http://bootsnipp.com/user/snippets/www.linkedin.com/in/remcintosh/">Résumé</a>
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
