import alt from "../alt";
import UndoActions from "../actions/UndoActions";
import TaskActions from "../actions/TaskActions";
import TaskStore from "./TaskStore";

class UndoStore {
	constructor() {
		this.state = {
			latestItem: null
		};
		this._timeout = null;

		this.bindListeners({
			handleUndo: UndoActions.UNDO,
			handleDeleteTask: TaskActions.DELETE_TASK
		});
	}
	
	startTimeout() {
		if(this._timeout)
			clearTimeout(this._timeout);
			
		this._timeout = setTimeout(() => {
			this.setState({
				latestItem: null
			});
			this._timeout = null;
		}, 10000);
	}

	handleUndo() {
		this.state.latestItem = null;
	}
	
	handleDeleteTask(id) {
		const task = TaskStore.getTask(id);
		
		this.state.latestItem = {
			type: "DELETE_TASK",
			message: "Deleted task.",
			payload: {
				name: task.name,
				repeats: task.repeats
			}
		};
		
		this.startTimeout();
	}
}

export default alt.createStore(UndoStore, "UndoStore");