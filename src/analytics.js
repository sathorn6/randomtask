const analytics = {
	_ga(...args) {
		// Only send data in production
		if(process && process.env && process.env.NODE_ENV == 'production')
			ga.apply(undefined, args);
	},
	sendEvent(category, action) {
		this._ga('send', 'event', category, action);
	},
	sendError(message, context) {
		this.sendEvent('error', message, context);
	},
}

// Send JS Errors to GA
window.onerror = function(message, source, lineno, colno = 'unavailable', error = {stack:'unavailable'}) {
	analytics.sendError(message, 'Message: "' + message + '" at ' + source + ':' + lineno + ':' + colno + '\nStack: ' + error.stack);
}

export default analytics;