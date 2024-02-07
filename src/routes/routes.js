const express = require("express");
const router = express.Router();

const routes = [
	{ path: "/", view: "home", title: "Home" },
	{ path: "/notice", view: "notice", title: "Notice" },
	{ path: "/department", view: "department", title: "Department" },
	{ path: "/queries", view: "queries", title: "Queries" },
	{ path: "/about", view: "about", title: "About" },
	{ path: "/admin", view: "admin", title: "Admin" },
	{ path: "/dashboard", view: "dashboard", title: "Dashboard" },
	{ path: "/cs", view: "Departments/cs", title: "Departments Cs" },
	{ path: "/aids", view: "Departments/aids", title: "Departments Aids" },
	{ path: "/extc", view: "Departments/extc", title: "Departments Extc" },
	{ path: "/fe", view: "Departments/fe", title: "Departments Fe" },
	{ path: "/it", view: "Departments/it", title: "Departments It" },
	{ path: "/mech", view: "Departments/mech", title: "Departments Mech" },
];

routes.forEach((route) => {
	router.get(route.path, function (req, res) {
		res.render(route.view, { title: route.title });
	});
});

module.exports = router;
