const db = require("../db");

exports.getTests = (req, res, next) => {
	// Se connecte à la base de données et exécute la requête
	db.con.query("SELECT * FROM test", (err, queryRes, fields) => {
		// Si erreur, on renvoi l'erreur
		if (err) throw err;

		// Transforme le résultat en objet utilisable
		queryRes = queryRes.map((v) => Object.assign({}, v));

		// Réponds avec le statut 200 (Success) et les objets récupéré sur la base
		res.status(200).json(queryRes);
	});
};
