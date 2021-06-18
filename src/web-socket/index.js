const events = require("events");

module.exports = (...args) => {
	const socket = {
		_ws: undefined,
		_events: undefined,

		_init: (ws) => {
			socket._ws = ws;

			socket._events = new events();

			setTimeout(() => {
				socket._events.emit("open");
			});

			return socket;
		},

		send: (...args) => {
			return socket._ws.send(...args);
		},

		on: (...args) => {
			socket._events.on(...args);
			return socket._ws.on(...args);
		},

		close: () => {
			return socket._ws.close();
		}
	};

	return socket._init(...args);
};
