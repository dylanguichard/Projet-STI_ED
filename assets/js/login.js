function signup(e, formEl) {
	e.preventDefault();
	console.log(formEl);

	let username = document.querySelector("#usernameInput").value;
	let password = document.querySelector("#passwordInput").value;

	let formData = new FormData();
	formData.append("name", username);
	formData.append("password", password);
	let data = {
		username: username,
		password: password,
	};
	fetch("http://localhost:5000/api/user/signup", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => {
		console.log(res);
		res.json().then((json) => {
			console.log(json);
		});
	});
}

function login(e) {
	e.preventDefault();

	let username = document.querySelector("#usernameInput").value;
	let password = document.querySelector("#passwordInput").value;

	let formData = new FormData();
	formData.append("name", username);
	formData.append("password", password);
	let data = {
		username: username,
		password: password,
	};
	fetch("http://localhost:5000/api/user/login", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => {
		res.json().then((json) => {
			console.log(json);
			setCookie("token", json.token, 24);
		});
	});
}
