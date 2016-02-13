import React from "react";
import Actions from "../../Actions";

import "./style.scss";

export default class AddTask extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      repeats: false
    }
  }
  updateName(event) {
    this.setState({
      name: event.target.value,
      repeats: this.state.repeats
    });
  }
  toggleRepeats() {
    this.setState({
      name: this.state.name,
      repeats: !this.state.repeats
    });
  }
  addTask() {
    Actions.createTask(this.state.name, this.state.repeats);
    this.setState({
      name: "",
      repeats: this.state.repeats
    });
  }
  render() {
    return <div className="add-task">
      <input ref="name" placeholder="New task" value={this.state.name}
        onChange={this.updateName.bind(this)}
        onKeyDown={(event) => {
          if(event.keyCode == 13)
            this.addTask();
        }}
      />
      <span className={"btn repeat " + (this.state.repeats ? "enabled" : "disabled")} onClick={this.toggleRepeats.bind(this)}><i className="fa fa-repeat" /></span>
      <button className="small" onClick={this.addTask.bind(this)}>Add</button>
    </div>;
  }
}