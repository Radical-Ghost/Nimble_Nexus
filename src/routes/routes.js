const express = require("express");
const router = express.Router();

const routes = [
	{ path: "/", view: "home" },
	{ path: "/notice", view: "notice" },
	{ path: "/department", view: "department" },
	{ path: "/queries", view: "queries" },
	{ path: "/about", view: "about" },
	{ path: "/admin", view: "admin" },
	{ path: "/dashboard", view: "dashboard" },
	{ path: "/cs", view: "Departments/cs" },
	{ path: "/aids", view: "Departments/aids" },
	{ path: "/extc", view: "Departments/extc" },
	{ path: "/fe", view: "Departments/fe" },
	{ path: "/it", view: "Departments/it" },
	{ path: "/mech", view: "Departments/mech" },
];

routes.forEach((route) => {
	router.get(route.path, function (req, res) {
		res.render(route.view);
	});
});

module.exports = router;
