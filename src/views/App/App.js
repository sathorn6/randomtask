import React from "react";
import connectToStores from "alt-utils/lib/connectToStores";
import CurrentTask from "../CurrentTask/CurrentTask";
import TaskList from "../TaskList/TaskList";
import TaskStore from "../../stores/TaskStore";

class App extends React.Component {
	static getStores(props) {
		return [TaskStore]
	}
	static getPropsFromStores(props) {
		return TaskStore.getState()
	}
	render() {
		if(this.props.currentTask)
			return <div>
				<CurrentTask task={this.props.currentTask} />
			</div>;
		else
			return <div>
				<TaskList tasks={this.props.tasks}/>
			 </div>;
	}
}

export default connectToStores(App);