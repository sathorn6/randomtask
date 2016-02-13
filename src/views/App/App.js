import React from "react";
import CurrentTask from "../CurrentTask/CurrentTask";
import TaskList from "../TaskList/TaskList";
import TaskStore from "../../TaskStore";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    TaskStore.onChange(() => {
      this.setState(this.getState());
    });

    this.state = this.getState();
  }
  getState() {
    return {
      selectedTask: TaskStore.getSelectedTask(),
      tasks: TaskStore.getTasks()
    };
  }
  render() {
    if(this.state.selectedTask)
      return <div>
        <CurrentTask task={this.state.selectedTask} />
      </div>;
    else
      return <div>
        <TaskList tasks={this.state.tasks}/>
       </div>;
  }
}