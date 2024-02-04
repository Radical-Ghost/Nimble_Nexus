const login_change = document.querySelector(".login-sec");
const sign_up = document.querySelector(".register-link");
const sign_in_reg = document.querySelector(".sign-in-link-reg");
const sign_in_admin = document.querySelector(".sign-in-link-admin");
const admin_sign_in = document.querySelector(".admin-sign-in");

sign_in_admin.addEventListener("click", () => {
	login_change.classList.remove("deactive");
});

admin_sign_in.addEventListener("click", () => {
	login_change.classList.add("deactive");
});

sign_up.addEventListener("click", () => {
	login_change.classList.add("active");
	login_change.classList.remove("deactive");
});

sign_in_reg.addEventListener("click", () => {
	login_change.classList.remove("active");
});

function verify_admin() {
	const username = document.getElementById("username").value;
	const admin_password = document.getElementById("admin-password").value;
	if (username === "admin" && admin_password === "admin656") {
		window.open("../home.ejs", "_self");
	} else {
		alert("Invalid Username or Password");
	}
}

function verify_user() {
	const user_email = document.getElementById("login-email").value;
	const user_password = document.getElementById("login-password").value;
	if (user_email === "user@656" && user_password === "user656") {
		window.open("../home.ejs", "_self");
	} else {
		alert("Invalid Username or Password");
	}
}
