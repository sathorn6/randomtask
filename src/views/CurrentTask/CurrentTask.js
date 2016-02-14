import React from "react";
import Actions from "../../actions/TaskActions";

import "./style.scss";

export default class CurrentTask extends React.Component {
	render() {
		let task = this.props.task;
		
		return <div className="current-task">
			<h1>Current Task</h1>
			<p>Do <span className="task">&quot;{task.name}&quot;</span> now!</p>
			<button onClick={Actions.finishSelectedTask}>Done</button>
		</div>;
	}
}