const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		if (token && token !== "undefined") {
			const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
			const userId = decodedToken.userId;
			req.auth = {
				userId: userId,
			};
			next();
		} else {
			res.status(401).json({ message: "You have to be connected" });
		}
	} catch (err) {
		console.log(err);
		res.status(401).json({ err });
	}
};
