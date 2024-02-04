const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));

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
	app.get(route.path, function (req, res) {
		res.render(route.view);
	});
});

const port = 3000;
app.listen(port, function () {
	console.log(`Server is running on port ${port}`);
});
