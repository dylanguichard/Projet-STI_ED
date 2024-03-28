const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

exports.signup = (req, res, next) => {
	// Crypte le mot de passe recu
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			// Ajoute l'utilisateur en BDD
			const query = `INSERT INTO user (username, password) VALUES ("${req.body.username}", "${hash}");`;
			db.con.query(query, (err, queryRes, fields) => {
				if (err) throw err;
				res.status(201).json({
					message: "User créé !",
				});
			});
		})
		.catch((err) => res.status(500).json({ err }));
};
exports.login = (req, res, next) => {
	// Cherche l'utilisateur avec le nom contenu dans username
	const query = `SELECT * FROM user WHERE username="${req.body.username}"`;
	db.con.query(query, (err, queryRes, fields) => {
		if (err) throw err;
		user = queryRes[0];
		// Si l'utilisateur existe
		if (queryRes[0]) {
			// On compare le mot de passe fourni avec celui encrypté dans la BDD
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					// Si mdp invalide
					if (!valid) {
						res.status(401).json({ message: "Paire id / mdp incorrect" });
					} else {
						// Si mdp valide on renvoi un statut 200 (Success) avec l'id de l'utilisateur et le jeton de connexion
						res.status(200).json({
							userId: user.id,
							token: jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
								expiresIn: "24h",
							}),
						});
					}
				})
				.catch((err) => {
					// Gestion d'erreur
					console.log(err);
					res.status(500).json({ err });
				});
		} else {
			// No user found
			res.status(401).json({ message: "Paire id / mdp incorrect" });
		}
		return res;
	});
};

// Permet de récupérer l'utilisateur à partir de son jeton d'authentification
exports.getUser = (req, res, next) => {
	// req.auth.userId contient id de l'utilisateur si il a bien été passé dans le jeton d'authentification (voir fichier auth.js)
	const query = `SELECT * FROM user WHERE id="${req.auth.userId}"`;
	db.con.query(query, (err, queryRes, fields) => {
		if (err) throw err;

		// Si l'utilisateur existe on revoi son username
		if (queryRes[0]) {
			res.status(200).json({ username: queryRes[0].username });
		} else {
			// No user found
			res.status(401).json({ message: "Invalid user" });
		}
		return res;
	});
};
