const implementations = {
	WebSocket: require("./web-socket"),
	ReconnectingWebSocket: require("./reconnecting-web-socket")
};

module.exports = (...args) => {
	const socket = {
		_engine: undefined,
		_init: (ws) => {
			if(implementations[ws.constructor.name] === undefined) {
				throw new Error("Unknown client");
			}

			socket._engine = implementations[ws.constructor.name](ws);

			return socket;
		},

		on: (...args) => {
			if(args[0] === "message") {
				const originalHandler = args[1];

				args[1] = (data) => {
					originalHandler(JSON.parse(message.data || data));
				};
			}

			return socket._engine.on(...args);
		},

		close: () => {
			return socket._engine.close();
		},

		send: (message) => {
			return socket._engine.send(JSON.stringify(message));
		}
	};

	return socket._init(...args);
};
