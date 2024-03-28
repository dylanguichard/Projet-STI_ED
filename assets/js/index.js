let username;

// CALL API GET TEST
window.onload = init();

function init() {
	getUser();
}

function getTests() {
	fetch("http://localhost:5000/api/tests/", {
		// On passe le jeton d'authentification dans l'entête de la requête
		headers: { Authorization: "Bearer " + getCookie("token") },
	}).then((res) => {
		// On transforme la réponse en JSON
		res.json().then((json) => {
			// On affiche le résutat dans la console
			console.log(json);

			// On cible l'élément qui à la class dataTest dans notre HTML
			const dataTestEl = document.querySelector(".dataTest");

			// On supprime la classe hidden qui cache l'élément
			dataTestEl.classList.remove("hidden");
			dataTestEl.querySelector(".data").textContent += JSON.stringify(json);
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

			// Si on a bien récupérer un username
			if (username) {
				showUser();
				showHeader();
				getTests();
			}
		});
	});
}

function showUser() {
	document.querySelector("#username").textContent = username;
}

function showHeader() {
	if (username) {
		document.querySelector("header.logged").classList.remove("hidden");
	} else {
		document.querySelector("header.invited").classList.remove("hidden");
	}
}

function loggout() {
	setCookie("token", "", 1);
	window.location.reload();
}
