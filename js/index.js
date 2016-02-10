"use strict";

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _React = React;
var Component = _React.Component;

var TaskStore = function () {
  function TaskStore() {
    var _this = this;

    _classCallCheck(this, TaskStore);

    this._selectedTask = null;

    if (window.localStorage.taskStoreData) this._tasks = JSON.parse(window.localStorage.taskStoreData);else this._tasks = [];

    this._listeners = [];
    this.onChange(function () {
      window.localStorage.taskStoreData = JSON.stringify(_this._tasks);
    });
  }

  TaskStore.prototype.onChange = function onChange(cb) {
    this._listeners.push(cb);
  };

  TaskStore.prototype.change = function change() {
    this._listeners.forEach(function (listener) {
      return listener();
    });
  };

  TaskStore.prototype.getTasks = function getTasks() {
    return this._tasks;
  };

  TaskStore.prototype.getTask = function getTask(id) {
    var index = this._tasks.indexOf(id);
    if (index == -1) throw new Error("Task not found");

    return this._tasks[index];
  };

  TaskStore.prototype.getTaskByIndex = function getTaskByIndex(index) {
    return this._tasks[index];
  };

  TaskStore.prototype.getSelectedTask = function getSelectedTask() {
    return this._selectedTask;
  };

  TaskStore.prototype.createTask = function createTask(name, repeats) {
    var task = {
      id: Date.now(),
      name: name,
      repeats: repeats,
      wasSelected: false
    };

    this._tasks.push(task);

    this.change();
  };

  TaskStore.prototype.updateTask = function updateTask(id, name, repeats) {
    var task = this.getTask(id);
    task.name = name;
    task.repeats = repeats;
    task.wasSelected = false;
    this.change();
  };

  TaskStore.prototype.deleteTask = function deleteTask(id) {
    var index = this._tasks.indexOf(id);
    if (index == -1) throw new Error("Task not found");

    this._tasks.splice(index, 1);

    this.change();
  };

  TaskStore.prototype.setSelectedTask = function setSelectedTask(id) {
    var _this2 = this;

    this._tasks.forEach(function (task) {
      task.wasSelected = task == _this2._selectedTask;
    });

    if (id != null) this._selectedTask = this.getTask(id);else this._selectedTask = null;

    this.change();
  };

  return TaskStore;
}();

var taskStore = new TaskStore();

var Actions = {
  createTask: function createTask(name, repeats) {
    taskStore.createTask(name, repeats);
  },
  updateTask: function updateTask(id, name, repeats) {
    taskStore.updateTask(id, name, repeats);
  },
  deleteTask: function deleteTask(id) {
    taskStore.deleteTask(id);
  },
  pickRandomTask: function pickRandomTask() {
    var index = Math.floor(Math.random() * taskStore.getTasks().length);
    taskStore.setSelectedTask(taskStore.getTaskByIndex(index));
  },
  finishSelectedTask: function finishSelectedTask() {
    var selected = taskStore.getSelectedTask();

    if (!selected) return;

    if (!selected.repeats) taskStore.deleteTask(selected);

    taskStore.setSelectedTask(null);
  }
};

var TaskView = function (_Component) {
  _inherits(TaskView, _Component);

  function TaskView() {
    _classCallCheck(this, TaskView);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  TaskView.prototype.render = function render() {
    var task = this.props.task;

    return React.createElement(
      "li",
      null,
      React.createElement("input", { className: task.wasSelected ? "selected" : "", placeholder: "Enter a name...", value: task.name, onChange: function onChange(event) {
          return Actions.updateTask(task, event.target.value, task.repeats);
        } }),
      React.createElement(
        "span",
        { className: "btn repeat " + (task.repeats ? "enabled" : "disabled"), onClick: function onClick() {
            return Actions.updateTask(task, task.name, !task.repeats);
          } },
        React.createElement("i", { className: "fa fa-repeat" })
      ),
      React.createElement(
        "span",
        { className: "btn delete", onClick: function onClick() {
            return Actions.deleteTask(task);
          } },
        React.createElement("i", { className: "fa fa-trash" })
      )
    );
  };

  return TaskView;
}(Component);

var AddTaskView = function (_Component2) {
  _inherits(AddTaskView, _Component2);

  function AddTaskView() {
    _classCallCheck(this, AddTaskView);

    var _this4 = _possibleConstructorReturn(this, _Component2.call(this));

    _this4.state = {
      name: "",
      repeats: false
    };
    return _this4;
  }

  AddTaskView.prototype.updateName = function updateName(event) {
    this.setState({
      name: event.target.value,
      repeats: this.state.repeats
    });
  };

  AddTaskView.prototype.toggleRepeats = function toggleRepeats() {
    this.setState({
      name: this.state.name,
      repeats: !this.state.repeats
    });
  };

  AddTaskView.prototype.addTask = function addTask() {
    Actions.createTask(this.state.name, this.state.repeats);
    this.setState({
      name: "",
      repeats: this.state.repeats
    });
  };

  AddTaskView.prototype.render = function render() {
    var _this5 = this;

    return React.createElement(
      "div",
      { className: "add-task" },
      React.createElement("input", { ref: "name", placeholder: "New task", value: this.state.name,
        onChange: this.updateName.bind(this),
        onKeyDown: function onKeyDown(event) {
          if (event.keyCode == 13) _this5.addTask();
        }
      }),
      React.createElement(
        "span",
        { className: "btn repeat " + (this.state.repeats ? "enabled" : "disabled"), onClick: this.toggleRepeats.bind(this) },
        React.createElement("i", { className: "fa fa-repeat" })
      ),
      React.createElement(
        "button",
        { className: "small", onClick: this.addTask.bind(this) },
        "Add"
      )
    );
  };

  return AddTaskView;
}(Component);

var TaskListView = function (_Component3) {
  _inherits(TaskListView, _Component3);

  function TaskListView() {
    _classCallCheck(this, TaskListView);

    return _possibleConstructorReturn(this, _Component3.apply(this, arguments));
  }

  TaskListView.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "task-list" },
      React.createElement(
        "h1",
        null,
        "Tasks"
      ),
      React.createElement(
        "ol",
        { className: "task-list" },
        this.props.tasks.map(function (task) {
          return React.createElement(TaskView, { key: task.id, task: task });
        })
      ),
      React.createElement(AddTaskView, null),
      React.createElement(
        "button",
        { onClick: Actions.pickRandomTask, disabled: !this.props.tasks.length },
        "Roll"
      )
    );
  };

  return TaskListView;
}(Component);

var CurrentTaskView = function (_Component4) {
  _inherits(CurrentTaskView, _Component4);

  function CurrentTaskView() {
    _classCallCheck(this, CurrentTaskView);

    return _possibleConstructorReturn(this, _Component4.apply(this, arguments));
  }

  CurrentTaskView.prototype.render = function render() {
    var task = this.props.task;

    return React.createElement(
      "div",
      { className: "current-task" },
      React.createElement(
        "h1",
        null,
        "Current Task"
      ),
      React.createElement(
        "p",
        null,
        "Do ",
        React.createElement(
          "span",
          { className: "task" },
          "\"",
          task.name,
          "\""
        ),
        " now!"
      ),
      React.createElement(
        "button",
        { onClick: Actions.finishSelectedTask },
        "Done"
      )
    );
  };

  return CurrentTaskView;
}(Component);

var AppView = function (_Component5) {
  _inherits(AppView, _Component5);

  function AppView(props) {
    _classCallCheck(this, AppView);

    var _this8 = _possibleConstructorReturn(this, _Component5.call(this, props));

    taskStore.onChange(function () {
      _this8.setState(_this8.getState());
    });

    _this8.state = _this8.getState();
    return _this8;
  }

  AppView.prototype.getState = function getState() {
    return {
      selectedTask: taskStore.getSelectedTask(),
      tasks: taskStore.getTasks()
    };
  };

  AppView.prototype.render = function render() {
    if (this.state.selectedTask) return React.createElement(
      "div",
      null,
      React.createElement(CurrentTaskView, { task: this.state.selectedTask })
    );else return React.createElement(
      "div",
      null,
      React.createElement(TaskListView, { tasks: this.state.tasks })
    );
  };

  return AppView;
}(Component);

ReactDOM.render(React.createElement(AppView, null), document.getElementById("mount"));