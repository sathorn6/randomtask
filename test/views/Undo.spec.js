import Undo from "../../src/views/Undo/Undo";

import UndoActions from "../../src/actions/UndoActions";

import React from "react";
import ReactTestUtils from "react-addons-test-utils";

describe("Undo View", () => {
	let tree;
	let undoButton;
	
	const testItem = {
		type: "DELETE_TASK",
		message: "Deleted task.",
		payload: {
			name: "My Task",
			repeats: true
		}
	};
	
	beforeAll(() => {
		spyOn(UndoActions, "undo");
	});
	
	it("can be rendered", () => {
		tree = ReactTestUtils.renderIntoDocument(
			<Undo item={testItem}/>
		);
		
		undoButton = ReactTestUtils.findRenderedDOMComponentWithTag(tree, "a");
	});
	
	it("will undo the item", () => {
		ReactTestUtils.Simulate.click(undoButton);
		
		expect(UndoActions.undo).toHaveBeenCalledWith(testItem);
	});
});