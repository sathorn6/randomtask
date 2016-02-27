import UndoStore from "../src/stores/UndoStore";
import TaskStore from "../src/stores/TaskStore";
import UndoActions from "../src/actions/UndoActions";
import TaskActions from "../src/actions/TaskActions";

import analytics from "../src/analytics";

describe("UndoStore", () => {
	let state;
	let tasks;
	
	function updateState() {
		state = UndoStore.getState();
		tasks = TaskStore.getState().tasks;
	}
	
	it("is initially empty", () => {
		updateState();
		
		expect(state.latestItem).toEqual(null);
	});
	
	it("create an item on deleteTask", () => {
		jasmine.clock().install();
		
		TaskActions.createTask("My Task", true);
		
		updateState();
		
		TaskActions.deleteTask(tasks[0].id);
		
		updateState();
		
		expect(state.latestItem.type).toBe("DELETE_TASK");
		expect(state.latestItem.message).toEqual(jasmine.any(String));
		
		jasmine.clock().tick(10001);
		
		updateState();
		
		expect(state.latestItem).toBe(null);
	});
	
	it("will undo an item", () => {
		TaskActions.createTask("My Task", true);
		updateState();
		TaskActions.deleteTask(tasks[0].id);
		updateState();
		
		spyOn(analytics, "sendEvent");
		spyOn(TaskActions, "createTask");
		
		UndoActions.undo(state.latestItem);
		
		updateState();
		
		expect(state.latestItem).toBe(null);
		expect(analytics.sendEvent).toHaveBeenCalledWith("undo", "DELETE_TASK");
		expect(TaskActions.createTask).toHaveBeenCalledWith("My Task", true);
	});
});