const mysql = require("mysql");

// Créer la connection à la BDD
// Si vous avez modifier les identifiants d'acces à votre base modifiez les ici
const con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "sti_ed",
});

// Execute la connection
con.connect((err) => {
	if (err) throw err;
	console.log("Connected!");
});

// Exporte la connexion pour permettre à d'autre module de l'utiliser
module.exports = { con: con };
