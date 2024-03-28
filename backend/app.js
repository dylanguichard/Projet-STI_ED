const express = require("express");

const app = express();
const cors = require("cors");

// Gestions des routes (URL)
const testsRoutes = require("./routes/tests");
const userRoutes = require("./routes/user");

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Transforme toutes les données recues en JSON
app.use(cors()); // Gestion des CORS (appel de server via une origine différente)

// Pour les URL contenant /api/tests/ on utilisera les routes de testsRoutes
app.use("/api/tests/", testsRoutes);
// Pour les URL contenant /api/user/ on utilisera les routes de userRoutes
app.use("/api/user/", userRoutes);

module.exports = app;
