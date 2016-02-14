import alt from "../alt";

class TaskActions {
	setTasks(tasks) {
		return tasks;
	}
	createTask(name, repeats) {
		return {
			name,
			repeats
		};
	}
	updateTask(id, name, repeats) {
		return {
			id,
			name,
			repeats
		};
	}
	deleteTask(id) {
		return id;
	}
	pickRandomTask() {
		return (dispatch) => dispatch();
	}
	finishSelectedTask() {
		return (dispatch) => dispatch();
	}
};

export default alt.createActions(TaskActions);