import TaskListItem from "../../src/views/TaskList/TaskListItem";

import TaskActions from "../../src/actions/TaskActions";

import React from "react";
import ReactTestUtils from "react-addons-test-utils";

describe("TaskListItem View", () => {
	let tree;
	let input;
	let repeatsButton;
	let deleteButton;
	
	const testTask = {
		id: 123,
		name: "My Task",
		repeats: false
	};
	
	beforeAll(() => {
		spyOn(TaskActions, "updateTask");
		spyOn(TaskActions, "deleteTask");
	});
	
	it("can be rendered", () => {
		tree = ReactTestUtils.renderIntoDocument(
			<TaskListItem task={testTask}/>
		);
		
		input = ReactTestUtils.findRenderedDOMComponentWithTag(tree, "input");
		repeatsButton = ReactTestUtils.findRenderedDOMComponentWithClass(tree, "repeat");
		deleteButton = ReactTestUtils.findRenderedDOMComponentWithClass(tree, "delete");
	});
	
	it("will change the name", () => {
		input.value = "My New Task";
		ReactTestUtils.Simulate.change(input);
		
		expect(TaskActions.updateTask).toHaveBeenCalledWith(testTask, "My New Task", false);
	});
	
	it("will toggle repeats", () => {
		ReactTestUtils.Simulate.click(repeatsButton);
		
		expect(TaskActions.updateTask).toHaveBeenCalledWith(testTask, "My Task", true);
	});
	
	it("will delete the task", () => {
		ReactTestUtils.Simulate.click(deleteButton);
		
		expect(TaskActions.deleteTask).toHaveBeenCalledWith(testTask);
	});
});