import "babel-polyfill";

import TaskStore from "../src/stores/TaskStore";
import TaskActions from "../src/actions/TaskActions";

import analytics from "../src/analytics";

describe("TaskStore", () => {
	let state;
	
	function updateState() {
		state = TaskStore.getState();
	}
	
	it("is initially empty", () => {
		updateState();
		
		expect(state.tasks).toEqual([]);
		expect(state.currentTask).toEqual(null);
		expect(state.previousTask).toEqual(null);
	});
	
	it("can add a task", () => {
		TaskActions.createTask("My Task", false);
		
		updateState();
		
		expect(state.tasks[0].name).toBe("My Task");
		expect(state.tasks[0].repeats).toBe(false);
	});
	
	it("can update a task", () => {
		TaskActions.updateTask(state.tasks[0].id, "My New Task", true);
		
		updateState();
		
		expect(state.tasks[0].name).toBe("My New Task");
		expect(state.tasks[0].repeats).toBe(true);
	});
	
	it("can delete a task", () => {
		TaskActions.deleteTask(state.tasks[0].id);
		
		updateState();
		
		expect(state.tasks.length).toBe(0);
	});
	
	it("can pick a task", () => {
		TaskActions.createTask("My Task", false);
		TaskActions.pickRandomTask();
		
		updateState();
		
		expect(state.currentTask).toBe(state.tasks[0]);
	});
	
	it("can finish a task", () => {
		spyOn(analytics, "sendEvent");
		
		TaskActions.finishCurrentTask();
		
		expect(analytics.sendEvent).toHaveBeenCalledWith("task", "finish");
		
		updateState();
		
		expect(state.tasks.length).toBe(0);
		expect(state.currentTask).toBe(null);
	});
	
	it("keeps a repeating task", () => {
		TaskActions.createTask("My Task", true);
		TaskActions.pickRandomTask();
		
		spyOn(analytics, "sendEvent");
		
		TaskActions.finishCurrentTask();
		
		expect(analytics.sendEvent).toHaveBeenCalledWith("task", "finish");
		
		updateState();
		
		expect(state.tasks.length).toBe(1);
		expect(state.currentTask).toBe(null);
		expect(state.previousTask).toBe(state.tasks[0]);
	});
});