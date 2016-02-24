export default {
	sendEvent(category, action) {
		ga('send', 'event', category, action);
	}
}