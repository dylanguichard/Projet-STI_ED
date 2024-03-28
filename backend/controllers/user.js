const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

exports.signup = (req, res, next) => {
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
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
	const query = `SELECT * FROM user WHERE username="${req.body.username}"`;
	db.con.query(query, (err, queryRes, fields) => {
		if (err) throw err;
		if (queryRes[0]) {
			console.log(queryRes[0]);
			console.log(queryRes[0].password);
			bcrypt
				.compare(req.body.password, queryRes[0].password)
				.then((valid) => {
					console.log(valid);
					if (!valid) {
						res.status(401).json({ message: "Paire id / mdp incorrect" });
					} else {
						res.status(200).json({
							userId: queryRes[0].id,
							// token: "TOKEN",
							token: jwt.sign({ userId: queryRes[0].id }, "RANDOM_TOKEN_SECRET", {
								expiresIn: "24h",
							}),
						});
					}
				})
				.catch((err) => {
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

exports.getUser = (req, res, next) => {
	const query = `SELECT * FROM user WHERE id="${req.auth.userId}"`;
	db.con.query(query, (err, queryRes, fields) => {
		if (err) throw err;
		console.log(req.auth.userId);
		if (queryRes[0]) {
			console.log(queryRes[0].username);
			res.status(200).json({ username: queryRes[0].username });
		} else {
			// No user found
			res.status(401).json({ message: "Invalid user" });
		}
		return res;
	});
};
