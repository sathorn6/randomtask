import AddTask from "../../src/views/AddTask/AddTask";

import TaskActions from "../../src/actions/TaskActions";

import React from "react";
import ReactTestUtils from "react-addons-test-utils";

describe("AddTask View", () => {
	let tree;
	let input;
	let repeatsButton;
	let addButton;
	
	it("can be rendered", () => {
		tree = ReactTestUtils.renderIntoDocument(
			<AddTask />
		);
		
		input = ReactTestUtils.findRenderedDOMComponentWithTag(tree, "input");
		repeatsButton = ReactTestUtils.findRenderedDOMComponentWithClass(tree, "repeat");
		addButton = ReactTestUtils.findRenderedDOMComponentWithTag(tree, "button");
	});
	
	it("will create a task", () => {
		spyOn(TaskActions, "createTask");
		
		input.value = "My Task";
		ReactTestUtils.Simulate.change(input);
		ReactTestUtils.Simulate.click(repeatsButton);
		ReactTestUtils.Simulate.click(addButton);
		
		expect(TaskActions.createTask).toHaveBeenCalledWith("My Task", true);
		expect(input.value).toBe("");
	});
	
	it("will create the task on enter", () => {
		spyOn(TaskActions, "createTask");
		
		ReactTestUtils.Simulate.click(repeatsButton);
		input.value = "My Task";
		ReactTestUtils.Simulate.change(input);
		ReactTestUtils.Simulate.keyDown(input, {keyCode: 13});
		
		expect(TaskActions.createTask).toHaveBeenCalledWith("My Task", false);
		expect(input.value).toBe("");
	});
});