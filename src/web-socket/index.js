const events = require("events");

module.exports = (...args) => {
	const socket = {
		_ws: undefined,
		_events: undefined,

		_opened: false,

		_init: (ws) => {
			socket._ws = ws;

			socket._events = new events();

			return socket;
		},

		send: (...args) => {
			return socket._ws.send(...args);
		},

		on: (...args) => {
			socket._events.on(...args);
			socket._ws.on(...args);

			if(socket._opened === false) {
				socket._opened = true;

				setTimeout(() => {
					socket._events.emit("open");
				});
			}
		},

		close: () => {
			return socket._ws.close();
		}
	};

	return socket._init(...args);
};
