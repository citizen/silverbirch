var App = React.createClass({

  getInitialState: function() {
    return {tasks : {}, top_tasks: {}};
  },

  componentWillMountStaticTest: function() {
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

    var top_tasks = {"task 1": tasks["task 1"]};
    this.setState({tasks: tasks, top_tasks: top_tasks});
    /*
    */
    var self = this;
    function add_new_task(level) {
      var new_task = {
        "title": "level " + level,
        "children": []
      }
      tasks["task " + level] = new_task;
      tasks["task " + (level - 1)].children["task " + level] = tasks["task " + level];
      self.setState({tasks: tasks, top_tasks: top_tasks});
      setTimeout(function() {add_new_task(level + 1)}, 2000);
    }
    add_new_task(4);

    /*
    */
    function add_new_parent_task(level) {
      var new_task = {
        "title": "level " + level,
        "children": []
      }
      tasks["task " + level] = new_task;
      tasks["task " + level].children["task " + level] = tasks["task " + (level + 1)];
      top_tasks = [tasks["task " + level]];
      self.setState({tasks: tasks, top_tasks: top_tasks});
      setTimeout(function() {add_new_parent_task(level + 1)}, 2000);
    }
    add_new_parent_task(0);
  },

  initme: function(parentId, level) {
    var firebaseRef = new Firebase("https://jkilla-tom.firebaseio.com/");
    var authData = firebaseRef.getAuth();
    var users = {};
    users[authData.uid] = true;
    var task = firebaseRef.child('tasks').push();
    var taskId = task.key();
    var initme = this.initme;
    task.set({
        title: "task level " + level,
        description: "description for task level " + level,
        users: users
    }, function(error) {
      if (error) {
        console.log('Synchronization failed');
      } else {
        firebaseRef.child('usersTasks/' + authData.uid + "/" + taskId).set(true);
        if(parentId) {
          firebaseRef.child('tasks/' + parentId + "/relationships/child_of/" + taskId).set(true);
        }
        if(level < 10) {
          setTimeout(function() { initme(taskId, level + 1) }.bind(this), 1000);
        }
      }
    });
  },

  componentWillMount: function() {
    var firebaseRef = new Firebase("https://jkilla-tom.firebaseio.com/");
    var tasks = {};
    var initme = this.initme;
    var first_time = true;
    console.log("tasks object", tasks);
    firebaseRef.onAuth(function(authData) {
      if (authData) {
        initme(null, 0);
        firebaseRef.child('usersTasks/' + authData.uid).on('child_added', function(usersTaskSnapshot) {
          var taskId = usersTaskSnapshot.key();
          firebaseRef.child('tasks/' + taskId).on('value', function(taskSnapshot) {
	    var task = taskSnapshot.val();
	    task.uid = taskId;
            if (taskId in tasks) {
	      tasks[taskId].title = task.title;
	      tasks[taskId].description = task.description;
	      tasks[taskId].fbRef = taskSnapshot.ref();
              tasks[taskId].children = {};
              if ('relationships' in task && 'child_of' in task.relationships) {
	        Object.keys(task.relationships.child_of).forEach(function(childId, idx) {
                  if (!(childId in tasks)) {
                    tasks[childId] = {};
                  }
	          tasks[taskId].children[childId] = tasks[childId];
                });
              };
	    } else {
              tasks[taskId] = {
                title: task.title,
                description: task.description,
	        fbRef: taskSnapshot.ref(),
	        children: {}
              }
	      if ('relationships' in task && 'child_of' in task.relationships) {
	        Object.keys(task.relationships.child_of).forEach(function(childId, idx) {
                  if (!(childId in tasks)) {
                    tasks[childId] = {};
                  }
	          tasks[taskId].children[childId] = tasks[childId];
                });
	      }
            }

            this.setState({tasks: tasks});
            if(first_time) {
              first_time = false;
              var top_tasks = {};
              top_tasks[taskId] = tasks[taskId];
              this.setState({top_tasks: top_tasks});
            }
          }, function(error) {console.log("fetch error on " + taskId + " - ", error)}, this);
        }, function(error) {console.log("fetch error on " + taskId + " - ", error)}, this);
      } else {
        firebaseRef.authWithOAuthPopup("github", function(error, authData) {
          console.log("freshly authed");
        });
      }
    }, this);
  },

  render: function() {
    //console.log("App.state.top_tasks", this.state.top_tasks);
    return (
      <div className="app">
        <ul className="tasks">
          <Task task={{"title": "pseudo-top", "children": this.state.top_tasks}} />
        </ul>
      </div>
    );
  }
});

var Task = React.createClass({
  render: function() {
    //console.log("Task.props.task.children", this.props.task.children);
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
    //console.log("Tasks.props.tasks", this.props.tasks);
    var tasks = this.props.tasks;
    var taskNodes = Object.keys(tasks).map(function (taskId) {
      if(taskId in tasks && 'title' in tasks[taskId]) {
        return (
          <Task task={tasks[taskId]} />
        );
      }
    });
    return (
      <ul className="tasks">
        {taskNodes}
      </ul>
    );
  }
});

React.render(
  <App />,
  document.getElementById('content')
);
