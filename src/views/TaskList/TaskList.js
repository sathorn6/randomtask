import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import AddTask from "../AddTask/AddTask";
import Actions from "../../actions/TaskActions";

import "./style.scss";

class TaskListItem extends React.Component {
	render() {
		let task = this.props.task;
		
		return <li>
			<div className="container">
				<input
					className={task.wasSelected ? "selected" : ""}
					placeholder="Enter a name..." value={task.name}
					onChange={(event) => Actions.updateTask(task, event.target.value, task.repeats)}
				/>
				<span
					className={"btn repeat first " + (task.repeats ? "enabled" : "disabled")}
					onClick={() => Actions.updateTask(task, task.name, !task.repeats)}
				>
					<i className="fa fa-repeat" />
				</span>
				<span
					className="btn delete last"
					onClick={() => Actions.deleteTask(task)}
				>
					<i className="fa fa-trash" />
				</span>
			</div>
		</li>;
	}
}

export default class TaskList extends React.Component {
	render() {
		return <div className="task-list">
			<h1>Tasks</h1>
			<ol>
				<ReactCSSTransitionGroup transitionName="task-anim" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          			{this.props.tasks.map((task) => {
						return <TaskListItem key={task.id} task={task} />
					})}
				</ReactCSSTransitionGroup>
			</ol>
			<AddTask />
			<button
				className="roll-button"
				onClick={Actions.pickRandomTask}
				disabled={!this.props.tasks.length}
			>
				Roll
			</button>
		</div>;
	}
}