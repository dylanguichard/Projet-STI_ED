let username;

// CALL API GET TEST
window.onload = getUser();

function getTests() {
	fetch("http://localhost:5000/api/tests/", {
		headers: { Authorization: "Bearer " + getCookie("token") },
	}).then((res) => {
		console.log(res);
		res.json().then((json) => {
			console.log(json);
		});
	});
}

function getUser() {
	fetch("http://localhost:5000/api/user/", {
		headers: { Authorization: "Bearer " + getCookie("token") },
	}).then((res) => {
		console.log(res);
		res.json().then((json) => {
			console.log(json);
			username = json.username;
		});
	});
}
