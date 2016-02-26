import React from "react";
import Actions from "../../actions/TaskActions";

import "./style.scss";

export default class AddTask extends React.Component {
	constructor() {
		super();
		this.state = {
			name: "",
			repeats: false
		}
	}
	updateName(event) {
		this.setState({
			name: event.target.value,
			repeats: this.state.repeats
		});
	}
	toggleRepeats() {
		this.setState({
			name: this.state.name,
			repeats: !this.state.repeats
		});
	}
	addTask() {
		Actions.createTask(this.state.name, this.state.repeats);
		this.setState({
			name: "",
			repeats: this.state.repeats
		});
	}
	render() {
		return <div className="add-task">
			<div className="container">
				<div className="wrap-input">
					<input
						ref="name"
						placeholder="New task"
						value={this.state.name}
						onChange={this.updateName.bind(this)}
						onKeyDown={(event) => {
							if(event.keyCode == 13)
								this.addTask();
						}}
					/>
				</div>
				<span
					className={"toggle " + (this.state.repeats ? "is-enabled" : "")}
					onClick={this.toggleRepeats.bind(this)}
				>
					<i className="fa fa-repeat" />
				</span>
				<div className="wrap-button">
					<button className="btn btn-default" onClick={this.addTask.bind(this)}>Add</button>
				</div>
			</div>
		</div>;
	}
}