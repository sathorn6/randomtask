import alt from "../alt";
import TaskActions from "../actions/TaskActions";

class TaskStore {
	constructor() {
		this.selectedTask = null;
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
			repeats,
			wasSelected: false
		};

		this.tasks.push(task);
	}

	handleUpdateTask({id, name, repeats}) {
		let task = this.getTask(id);
		task.name = name;
		task.repeats = repeats;
		task.wasSelected = false;
	}

	deleteTask(id) {
		const index = this.tasks.indexOf(id);
		if (index == -1)
			throw new Error("Task not found");

		this.tasks.splice(index, 1);
	}

	setSelectedTask(id) {
		this.tasks.forEach((task) => {
			task.wasSelected = (task == this.selectedTask);
		});

		if (id != null)
			this.selectedTask = this.getTask(id);
		else
			this.selectedTask = null;
	}
	
	handlePickRandomTask() {
		const index = Math.floor(Math.random() * this.tasks.length);
		this.setSelectedTask(this.getTaskByIndex(index));
	}
	
	handleFinishSelectedTask() {
		const selected = this.selectedTask;

		if (!selected)
			return;

		if (!selected.repeats)
			this.deleteTask(selected);

		this.setSelectedTask(null);
	}
}

export default alt.createStore(TaskStore, "TaskStore");