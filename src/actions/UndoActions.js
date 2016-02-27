import alt from "../alt";
import analytics from "../analytics";

import TaskActions from "./TaskActions";

class UndoActions {
	undo(item) {
		analytics.sendEvent("undo", item.type);
		
		switch(item.type) {
			case "DELETE_TASK":
				const task = item.payload;
				TaskActions.createTask(task.name, task.repeats);
				break;
		}
		
		return item;
	}
};

export default alt.createActions(UndoActions);