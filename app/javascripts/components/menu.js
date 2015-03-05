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

    var menuItems = (this.props.menuItems) ? this.props.menuItems : [],
        menuItem = menuItems.map(function(item, index) {
          return ( <li key={index}><a href="#">{item}</a></li> );
        })

		return (
      <div>
        <nav className={posClass} id={id}>
          <p>{this.props.title}</p>
          <ul>
            {menuItem}
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
