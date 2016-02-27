import React from "react";
import connectToStores from "alt-utils/lib/connectToStores";

import CurrentTask from "../CurrentTask/CurrentTask";
import TaskList from "../TaskList/TaskList";
import Undo from "../Undo/Undo";

import TaskStore from "../../stores/TaskStore";
import UndoStore from "../../stores/UndoStore";

class App extends React.Component {
	static getStores(props) {
		return [TaskStore, UndoStore]
	}
	static getPropsFromStores(props) {
		return {
			currentTask: TaskStore.getState().currentTask,
			tasks: TaskStore.getState().tasks,
			undoItem: UndoStore.getState().latestItem
		};
	}
	render() {
		let content;
		
		if(this.props.currentTask)
			content = <CurrentTask task={this.props.currentTask} />;
		else
			content = <TaskList tasks={this.props.tasks} />;
			
		return <div>
			{content}
			{this.props.undoItem ? <Undo item={this.props.undoItem} /> : null}
		</div>;
	}
}

export default connectToStores(App);