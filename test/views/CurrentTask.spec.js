import CurrentTask from "../../src/views/CurrentTask/CurrentTask";

import TaskActions from "../../src/actions/TaskActions";

import React from "react";
import ReactTestUtils from "react-addons-test-utils";

describe("CurrentTask View", () => {
	let tree;
	let finishButton;
	
	const testTask = {
		id: 123,
		name: "My Task",
		repeats: false
	};
	
	beforeAll(() => {
		spyOn(TaskActions, "finishCurrentTask");
	});
	
	it("can be rendered", () => {
		tree = ReactTestUtils.renderIntoDocument(
			<CurrentTask task={testTask}/>
		);
		
		finishButton = ReactTestUtils.findRenderedDOMComponentWithTag(tree, "button");
	});
	
	it("will finish a task", () => {
		ReactTestUtils.Simulate.click(finishButton);
		
		expect(TaskActions.finishCurrentTask).toHaveBeenCalled();
	});
});