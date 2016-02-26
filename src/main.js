import "babel-polyfill";

import "normalize.css";
import "./style/main.scss";

import React from "react";
import ReactDOM from "react-dom";
import FastClick from "fastclick";
import App from "./views/App/App";
import alt from "./alt";
import TaskStore from "./stores/TaskStore";
import TaskActions from "./actions/TaskActions";

const isTouch = ("ontouchstart" in window) || window.navigator.msMaxTouchPoints > 0;

if(isTouch) {
	// Move click event handlers from document to root because they cause flickering
	// on iOS which cannot be prevented on document (via -webkit-tap-highlight-color)
	
	const documentAddEL = document.addEventListener.bind(document);

	document.addEventListener = function(type, listener, useCapture) {
		if(type == "click" && !useCapture)
			document.documentElement.addEventListener(type, listener, useCapture);
		else
			documentAddEL(type, listener, useCapture);
	}
} else {
	// Fix permanent hover state on touch devices
    document.documentElement.className += " has-hover";
}

if(window.localStorage.taskStoreData)
	TaskActions.setTasks(JSON.parse(window.localStorage.taskStoreData));
	
TaskStore.listen((state) => {
	try {
		window.localStorage.taskStoreData = JSON.stringify(state.tasks);
	} catch(error) {}
});

ReactDOM.render(
	<App />,
  	document.getElementById("mount")
);

FastClick.attach(document.body);
