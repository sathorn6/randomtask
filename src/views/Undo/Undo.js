import React from "react";
import UndoActions from "../../actions/UndoActions";

import "./style.scss";

class Undo extends React.Component {
	render() {
		const item = this.props.item;
		
		return <div className="undo">
			<a href="#" onClick={() => {UndoActions.undo(item)}}>Undo</a>
			{item.message}	
		</div>;
	}
}

export default Undo;