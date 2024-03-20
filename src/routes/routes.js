const express = require("express");
const router = express.Router();
require("./login.js");

const routes = [
	{ path: "/", view: "home", title: "Home" },
	{ path: "/notice", view: "notice", title: "Notice" },
	{ path: "/department", view: "department", title: "Department" },
	{ path: "/queries", view: "queries", title: "Queries" },
	{ path: "/about", view: "about", title: "About" },
	{ path: "/admin", view: "admin", title: "Admin" },
	{ path: "/login", view: "login", title: "Login" },
	{ path: "/signup", view: "signup", title: "Signup" },
	{ path: "/dashboard", view: "dashboard", title: "Dashboard" },
	{ path: "/cs", view: "departments/cs", title: "Departments Cs" },
	{ path: "/aids", view: "departments/aids", title: "Departments Aids" },
	{ path: "/extc", view: "departments/extc", title: "Departments Extc" },
	{ path: "/fe", view: "departments/fe", title: "Departments Fe" },
	{ path: "/it", view: "departments/it", title: "Departments It" },
	{ path: "/mech", view: "departments/mech", title: "Departments Mech" },
	{ path: "/uploadfile", view: "uploadfile", title: "Uploadfile" },
];

const redirectLogin = (req, res, next) => {
	if (!req.session.userID) {
		res.render("login", { title: "Login" });
	} else {
		next();
	}
};

routes.forEach((route) => {
	router.get(route.path, redirectLogin, (req, res) => {
		res.render(route.view, { title: route.title });
	});
});

module.exports = router;
