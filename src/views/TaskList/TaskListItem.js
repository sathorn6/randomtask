import React from "react";
import Actions from "../../actions/TaskActions";

export default class TaskListItem extends React.Component {
	render() {
		let task = this.props.task;
		
		return <li>
			<div className="container">
				<input
					placeholder="Enter a name..." value={task.name}
					onChange={(event) => Actions.updateTask(task.id, event.target.value, task.repeats)}
				/>
				<span
					className={"btn repeat first " + (task.repeats ? "enabled" : "disabled")}
					onClick={() => Actions.updateTask(task.id, task.name, !task.repeats)}
				>
					<i className="fa fa-repeat" />
				</span>
				<span
					className="btn delete last"
					onClick={() => Actions.deleteTask(task.id)}
				>
					<i className="fa fa-trash" />
				</span>
			</div>
		</li>;
	}
}