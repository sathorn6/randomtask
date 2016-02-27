import alt from "../alt";
import TaskActions from "../actions/TaskActions";
import UndoStore from "./UndoStore";

class TaskStore {
	constructor() {
		this.currentTask = null;
		this.previousTask = null;
		this.tasks = [];

		this.bindListeners({
			handleSetTasks: TaskActions.SET_TASKS,
			handleCreateTask: TaskActions.CREATE_TASK,
			handleUpdateTask: TaskActions.UPDATE_TASK,
			handleDeleteTask: TaskActions.DELETE_TASK,
			handlePickRandomTask: TaskActions.PICK_RANDOM_TASK,
			handleFinishCurrentTask: TaskActions.FINISH_CURRENT_TASK,
		});
		
		this.exportPublicMethods({
			getTask: this.getTask.bind(this)
		});
	}

	getTask(id) {
		const task = this.tasks.find(function(task) {
			return task.id == id
		});
		
		if (!task)
			throw new Error("Task not found");

		return task;
	}
	
	handleSetTasks(tasks) {
		this.tasks = tasks;
	}

	handleCreateTask({name, repeats}) {
		let task = {
			id: Date.now(),
			name,
			repeats
		};

		this.tasks.push(task);
	}

	handleUpdateTask({id, name, repeats}) {
		let task = this.getTask(id);
		task.name = name;
		task.repeats = repeats;
		
		if(this.previousTask == task)
			this.previousTask = null;
	}

	deleteTask(id) {
		const task = this.getTask(id);
		const index = this.tasks.indexOf(task);
		
		if (index == -1)
			throw new Error("Task not found");

		this.tasks.splice(index, 1);
	}
	
	handleDeleteTask(id) {
		this.waitFor(UndoStore);
		this.deleteTask(id);
	}

	setCurrentTask(task) {
		if (task != null)
			this.currentTask = task;
		else
			this.currentTask = null;
	}
	
	handlePickRandomTask() {
		let task;
		
		if(!this.tasks.length)
			throw new Error("No tasks available to pick from");
		
		if(this.tasks.length > 1) {
			// Avoid picking the same task twice in a row
			const candidates = this.tasks.filter((task) => task != this.previousTask);
			const index = Math.floor(Math.random() * candidates.length);
			task = candidates[index];
		} else {
			task = this.tasks[0];
		}
		
		this.setCurrentTask(task);
	}
	
	handleFinishCurrentTask() {
		const selected = this.currentTask;

		if (!selected)
			return;

		this.previousTask = null; 
		
		if (!selected.repeats)
			this.deleteTask(selected.id);
		else
			this.previousTask = selected;
			
		this.setCurrentTask(null);
	}
}

export default alt.createStore(TaskStore, "TaskStore");