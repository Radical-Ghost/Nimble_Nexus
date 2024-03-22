const express = require("express");
const router = express.Router();
const notices = require("../models/notices");

const routes = [
	{ path: "/", view: "department", title: "Department" },
	{ path: "/notice", view: "notice", title: "Notice" },
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
	{ path: "/upload_notice", view: "upload_notice", title: "Upload Notice" },
];

const redirectLogin = (req, res, next) => {
	if (!req.session.userID && req.url !== "/login" && req.url !== "/signup") {
		res.render("login", { title: "Login" });
	} else {
		next();
	}
};

routes.forEach((route) => {
	router.get(route.path, redirectLogin, async (req, res) => {
		if (
			route.path === "/notice" ||
			route.path === "/cs" ||
			route.path === "/aids" ||
			route.path === "/extc" ||
			route.path === "/fe" ||
			route.path === "/it" ||
			route.path === "/mech"
		) {
			const allNotices = await notices.find({});
			res.render(route.view, { title: route.title, notices: allNotices });
		} else {
			res.render(route.view, { title: route.title });
		}
	});
});

module.exports = router;
