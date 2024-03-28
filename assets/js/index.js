let username;

// CALL API GET TEST
window.onload = getUser();

function getTests() {
	fetch("http://localhost:5000/api/tests/", {
		// On passe le jeton d'authentification dans l'entête de la requête
		headers: { Authorization: "Bearer " + getCookie("token") },
	}).then((res) => {
		// On transforme la réponse en JSON
		res.json().then((json) => {
			// On affiche le résutat dans la console
			console.log(json);
		});
	});
}

function getUser() {
	// On appel l'url http://localhost:5000/api/user/ du serveur
	fetch("http://localhost:5000/api/user/", {
		// On passe le jeton d'authentification dans l'entête de la requête
		headers: { Authorization: "Bearer " + getCookie("token") },
	}).then((res) => {
		// On transforme la réponse en JSON
		res.json().then((json) => {
			// On affiche le résutat dans la console
			console.log(json);

			// On assigne la valeur récupéré à la variable username
			username = json.username;
		});
	});
}
