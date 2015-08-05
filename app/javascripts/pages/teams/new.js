'use strict';

var React = require('react'),
    Router = require('react-router'),
    { Route } = Router;

var NewTeam = React.createClass({
  mixins: [
    Router.Navigation
  ],

  handleSubmit: function (event) {
    event.preventDefault();

    var teamObj = {},
        dbRef = this.props.fbRef,
      	rawTeamName = this.refs.teamName.getDOMNode().value.trim();

    // Require at least a team name
    if (!rawTeamName) {
      window.alert('Enter a team name!');
      return;
    }

    var teamName = rawTeamName.toLowerCase().replace(/ /g, '_');

    // Create the object to be sotored
    teamObj = {
      properties: {
        "is_type": "team",
      	"username": rawTeamName,
        "sbid": "sb:" + teamName
      },
      "relationships": {
        "has_users": {}
      }
    };

    teamObj.relationships.has_users['sb:' + teamName] = true;
    teamObj.relationships.has_users[this.props.user.key] = true;

    // TODO: input validation and dupe team detection
    dbRef.child('sb:' + teamName).set(teamObj, function (error) {
      if(error) {
        console.error(error);
      }

      this.refs.teamName.getDOMNode().value = "";

      dbRef
        .child(this.props.user.key + '/relationships/in_teams/sb:' + teamName)
        .set(true, function (error) {
          if (error) {
            console.error(error);
          }

          this.replaceWith('tasks', {
            viewContext: teamName
          });
        }.bind(this));
    }.bind(this));
  },

  render: function () {
    return (
      <div className="left-column-task">
        <form className="bootstrap-frm" onSubmit={this.handleSubmit}>
          <h4>Add a new team</h4>
          <div className="form-group">
            <input
              id="teamName"
              ref="teamName"
              type="text"
              placeholder="Team Name"
              className="form-control"
            />
          </div>
          <button type="submit" className="bootstrap-frm" src="/images/circle_add_plus.png">
            <img src="/images/circle_add_plus.png" width="50" height="50" alt=""/>
          </button>
        </form>
      </div>
    )
  }
});


module.exports = NewTeam;
