var App = React.createClass({

  getInitialState: function() {
    return {tasks : {}, top_tasks: []};
  },

  componentWillMount: function() {
    var tasks = {
      "task 1": {
        "title": "level 1",
        "children": {}
      },
      "task 2": {
        "title": "level 2",
        "children": {}
      },
      "task 3": {
        "title": "level 3",
        "children": {}
      }
    };

    tasks["task 1"].children["task 2"] = tasks["task 2"];
    tasks["task 2"].children["task 3"] = tasks["task 3"];

    var task_tops = {"task 1": tasks["task 1"]};
    this.setState({tasks: tasks, task_tops: task_tops});
    /*
    var self = this;
    function add_new_task(level) {
      var new_task = {
        "title": "level " + level,
        "children": []
      }
      tasks["task " + level] = new_task;
      tasks["task " + (level - 1)].children.push(tasks["task " + level]);
      self.setState({tasks: tasks, task_tops: task_tops});
      setTimeout(function() {add_new_task(level + 1)}, 2000);
    }
    add_new_task(4);
    */

    /*
    function add_new_parent_task(level) {
      var new_task = {
        "title": "level " + level,
        "children": []
      }
      tasks["task " + level] = new_task;
      tasks["task " + level].children.push(tasks["task " + (level + 1)]);
      task_tops = [tasks["task " + level]];
      self.setState({tasks: tasks, task_tops: task_tops});
      setTimeout(function() {add_new_parent_task(level - 1)}, 2000);
    }
    add_new_parent_task(0);
    */
  },

  componentWillMountie: function() {
    var firebaseRef = new Firebase("https://jkilla.firebaseio.com/");
    var tasks = this.state.tasks;
    firebaseRef.onAuth(function(authData) {
      if (authData) {

        var children = [];
        firebaseRef.child('usersTasks').on('child_added', function(usersTaskSnapshot) {
          firebaseRef.child('tasks').on('child_added', function(taskSnapshot) {
            var taskId = taskSnapshot.key();
            if (taskId in tasks) {
              var children = tasks[taskId].children;
	      tasks[taskId] = taskSnapshot.val();
	      tasks[taskId].children = children;
	    } else {
              tasks[taskId] = taskSnapshot.val();
              tasks[taskId].children = [];
            }
            this.setState({tasks: tasks});
          });
        });

        firebaseRef.child('tasksEdges').on('child_added', function(taskEdgesSnapshot) {
          var taskId = taskEdgesSnapshot.key();
          if (! taskId in tasks) {
            tasks[taskId] = {title: null, children: []};
          }
          taskEdgesSnapshot.child('child').on('child_added', function(childTaskEdgeSnapshot) {
            var childTaskId = childTaskEdgeSnapshot.key();
            if (! childTaskId in tasks) {
              tasks[childTaskId] = {title: null, children: []};
            }
          });
        });

        //var tasks = {
        //  "abc": {
        //    "title": "1st level",
        //    "children": []
        //  },
        //  "def": {
        //    "title": "2nd level",
        //    "children": []
        //  },
        //  "ghi": {
        //    "title": "3rd level",
        //    "children": []
        //  }
        //};
        //var task_tops = [tasks["abc"]];
        //tasks["abc"].children.push(tasks["def"]);
        //tasks["def"].children.push(tasks["ghi"]);
        //this.setState({tasks: tasks, task_tops: task_tops});

      } else {
        firebaseRef.authWithOAuthPopup("github", function(error, authData) {
          console.log("freshly authed");
        });
      }
    }, this);
  },

  render: function() {
    return (
      <div className="app">
        <ul className="tasks">
          <Task task={{"title": "pseudo-top", "children": this.state.task_tops}} />
        </ul>
      </div>
    );
  }
});

var Task = React.createClass({
  render: function() {
    return (
      <li className="task">
        <h1>{this.props.task.title}</h1>
        <Tasks tasks={this.props.task.children} />
      </li>
    );
  }
});

var Tasks = React.createClass({
  render: function() {
    var tasks = Object.keys(this.props.tasks).map(function ( taskId) {
      return (
        <Task task={this.props.tasks[taskId]} />
      );
    }.bind(this));
    return (
      <ul className="tasks">
        {tasks}
      </ul>
    );
  }
});

React.render(
  <App />,
  document.getElementById('content')
);
