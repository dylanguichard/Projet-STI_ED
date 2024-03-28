const http = require("http");
const app = require("./app");

const PORT = 5000;

const errorHandler = (error) => {
	if (error.syscall !== "listen") {
		throw error;
	}
	const address = server.address();
	const bind = typeof address === "string" ? "pipe " + address : "port: " + port;
	switch (error.code) {
		case "EACCES":
			console.error(bind + " requires elevated privileges.");
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(bind + " is already in use.");
			process.exit(1);
			break;
		default:
			throw error;
	}
};

app.set("port", PORT);
const server = http.createServer(app);

server.on("error", errorHandler);

server.on("listening", () => {
	const address = server.address();
	const bind = typeof address === "string" ? "pipe " + address : "port " + PORT;
	console.log("Listening on " + bind);
});

// server.on("request", (req, res) => {
// 	res.end("Request received");
// });

server.listen(PORT);
