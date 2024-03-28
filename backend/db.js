const mysql = require("mysql");

const con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "sti_ed",
});

con.connect((err) => {
	if (err) throw err;
	console.log("Connected!");
});

const saveTest = (data) => {
	console.log("Enter in saveTest");
	console.log(data);
};

module.exports = { con: con, saveTest: saveTest };
