const express = require("express"); // npm i express
const session = require("express-session"); // npm i express-session;

const app = express();
const cors = require("cors"); // npm i cors

const testsRoutes = require("./routes/tests");
const userRoutes = require("./routes/user");

app.use(
	session({
		secret: "secret",
		resave: true,
		saveUninitialized: true,
	})
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/tests/", testsRoutes);
app.use("/api/user/", userRoutes);

module.exports = app;
