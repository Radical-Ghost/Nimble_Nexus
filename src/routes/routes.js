const express = require("express");
const router = express.Router();
const notices = require("../models/notices");
const User = require("../models/user");

const routes = [
	{ path: "/", view: "department", title: "Home" },
	{ path: "/notice", view: "notice", title: "Notice" },
	{ path: "/queries", view: "queries", title: "Queries" },
	{ path: "/about", view: "about", title: "About" },
	{ path: "/admin", view: "admin", title: "Admin" },
	{ path: "/login", view: "login", title: "Login" },
	{ path: "/signup", view: "signup", title: "Signup" },
	{ path: "/dashboard", view: "dashboard", title: "Dashboard" },
	{ path: "/cs", view: "departments/cs", title: "Computer Engineering" },
	{ path: "/aids", view: "departments/aids", title: "AI & DS" },
	{ path: "/extc", view: "departments/extc", title: "Electronics" },
	{ path: "/fe", view: "departments/fe", title: "First Year" },
	{ path: "/it", view: "departments/it", title: "Information Technology" },
	{ path: "/mech", view: "departments/mech", title: "Mechanical" },
	{ path: "/acc", view: "departments/acc", title: "Accounts" },
	{ path: "/lib", view: "departments/lib", title: "Library" },
	{ path: "/upload_notice", view: "upload_notice", title: "Upload Notice" },
];

const redirectLogin = (req, res, next) => {
	if (!req.session.userID && req.url !== "/login" && req.url !== "/signup") {
		res.render("login", { title: "Login", isAdmin: req.isAdmin });
	} else {
		next();
	}
};

routes.forEach((route) => {
	router.get(route.path, redirectLogin, async (req, res) => {
		if (req.session.userID) {
			const user = await User.findById(req.session.userID);
			if (user && user.admin) {
				req.isAdmin = true;
			} else {
				req.isAdmin = false;
			}
		} else {
			req.isAdmin = false;
		}
		if (
			route.path === "/notice" ||
			route.path === "/cs" ||
			route.path === "/aids" ||
			route.path === "/extc" ||
			route.path === "/fe" ||
			route.path === "/it" ||
			route.path === "/mech" ||
			route.path === "/acc" ||
			route.path === "/lib"
		) {
			const allNotices = await notices.find({});
			res.render(route.view, {
				title: route.title,
				notices: allNotices,
				isAdmin: req.isAdmin,
			});
		} else if (route.path === "/") {
			const sorted_notices = await notices
				.find()
				.sort({ creation_date: "desc" })
				.limit(10);
			res.render(route.view, {
				title: route.title,
				notices: sorted_notices,
				isAdmin: req.isAdmin,
			});
		} else if (route.path === "/admin") {
			const no_notices = await notices.countDocuments();
			const all_users = await User.find({});
			res.render(route.view, {
				title: route.title,
				notices: no_notices,
				users: all_users,
				isAdmin: req.isAdmin,
			});
		} else {
			res.render(route.view, {
				title: route.title,
				isAdmin: req.isAdmin,
			});
		}
	});
});

module.exports = router;
