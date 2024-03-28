const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		// Récupération du jeton d'authentification
		const token = req.headers.authorization.split(" ")[1];

		// Si le jeton existe
		if (token && token !== "undefined") {
			// On décode le token à partir du mot de passe secret (ici RANDOM_TOKEN_SECRET)
			const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
			const userId = decodedToken.userId;
			// On ajoute dans la requete l'id de l'utilisateur qui à fait cette requete
			req.auth = {
				userId: userId,
			};
			next(); // Passe à la suite
		} else {
			res.status(401).json({ message: "You have to be connected" });
		}
	} catch (err) {
		console.log(err);
		res.status(401).json({ err });
	}
};
