import TaskList from "../../src/views/TaskList/TaskList";

import TaskActions from "../../src/actions/TaskActions";

import React from "react";
import ReactTestUtils from "react-addons-test-utils";

describe("TaskList View", () => {
	let tree;
	let rollButton;
	
	const testTasks = [{
		id: 123,
		name: "My Task",
		repeats: false
	}];
	
	beforeAll(() => {
		spyOn(TaskActions, "pickRandomTask");
	});
	
	it("can be rendered", () => {
		tree = ReactTestUtils.renderIntoDocument(
			<TaskList tasks={testTasks}/>
		);
		
		rollButton = ReactTestUtils.findRenderedDOMComponentWithClass(tree, "btn-primary");
	});
	
	it("will roll a task", () => {
		ReactTestUtils.Simulate.click(rollButton);
		
		expect(TaskActions.pickRandomTask).toHaveBeenCalled();
	});
});