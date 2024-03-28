const http = require("http");
const app = require("./app");

const PORT = 5000;

// Gestion d'erreur par defaut
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

// Met le port de l'application à 5000
app.set("port", PORT);

// Créer le server qui contient l'application 'app'
const server = http.createServer(app);

// Appel la fonction de gestion d'erreur quand il y en a une
server.on("error", errorHandler);

// Le server devient "à l'écoute" des requetes envoyées par le client
server.on("listening", () => {
	const address = server.address();
	const bind = typeof address === "string" ? "pipe " + address : "port " + PORT;
	console.log("Listening on " + bind);
});
server.listen(PORT);
