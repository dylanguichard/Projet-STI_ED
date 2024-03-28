const db = require("../db");

exports.getTests = (req, res, next) => {
	console.log("Enter get tests");
	db.con.query("SELECT * FROM test", (err, queryRes, fields) => {
		if (err) throw err;
		queryRes = queryRes.map((v) => Object.assign({}, v));
		console.log(queryRes);
		res.status(200).json(queryRes);
		return res;
	});
};
exports.saveTest = (req, res, next) => {
	console.log("Req body : ");
	// console.log(req);
	console.log(req.body);
	db.saveTest(req.body);
	res.status(201).json({
		message: "Objet créé !",
	});
};
