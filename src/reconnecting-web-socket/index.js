module.exports = (...args) => {
	const socket = {
		_ws: undefined,
		_events: undefined,

		_init: (ws) => {
			socket._ws = ws;
		},

		send: (...args) => {
			socket._ws.send(...args);
		},

		on: (...args) => {
			socket._ws.addEventListener(...args);
		},

		close: () => {
			socket._ws.close();
		}
	};

	return socket._init(...args);
};
