module.exports = (...args) => {
	const socket = {
		_ws: undefined,
		_events: undefined,

		_init: (ws) => {
			socket._ws = ws;

			return socket;
		},

		send: (...args) => {
			socket._ws.send(...args);
		},

		on: (...args) => {
			if(args[0] === "message") {
				const originalHandler = args[1];

				args[1] = (data) => {
					originalHandler(data.data);
				};
			}

			socket._ws.addEventListener(...args);
		},

		close: () => {
			socket._ws.close();
		}
	};

	return socket._init(...args);
};
