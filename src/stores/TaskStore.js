import alt from "../alt";
import TaskActions from "../actions/TaskActions";

class TaskStore {
	constructor() {
		this.selectedTask = null;
		this.previousTask = null;
		this.tasks = [];

		this.bindListeners({
			handleSetTasks: TaskActions.SET_TASKS,
			handleCreateTask: TaskActions.CREATE_TASK,
			handleUpdateTask: TaskActions.UPDATE_TASK,
			deleteTask: TaskActions.DELETE_TASK,
			handlePickRandomTask: TaskActions.PICK_RANDOM_TASK,
			handleFinishSelectedTask: TaskActions.FINISH_SELECTED_TASK,
		});
	}

	getTasks() {
		return this.tasks;
	}

	getTask(id) {
		const index = this.tasks.indexOf(id);
		if (index == -1)
			throw new Error("Task not found");

		return this.tasks[index];
	}

	getTaskByIndex(index) {
		return this.tasks[index];
	}

	getSelectedTask() {
		return this.selectedTask;
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
		const index = this.tasks.indexOf(id);
		if (index == -1)
			throw new Error("Task not found");

		this.tasks.splice(index, 1);
	}

	setSelectedTask(id) {
		if (id != null)
			this.selectedTask = this.getTask(id);
		else
			this.selectedTask = null;
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
		
		this.setSelectedTask(task);
	}
	
	handleFinishSelectedTask() {
		const selected = this.selectedTask;

		if (!selected)
			return;

		this.previousTask = null; 
		
		if (!selected.repeats)
			this.deleteTask(selected);
		else
			this.previousTask = selected;
			
		this.setSelectedTask(null);
	}
}

export default alt.createStore(TaskStore, "TaskStore");