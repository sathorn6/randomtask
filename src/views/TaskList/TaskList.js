import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import AddTask from "../AddTask/AddTask";
import TaskListItem from "./TaskListItem";
import Actions from "../../actions/TaskActions";

import "./style.scss";

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