//dependencies
require("dotenv").config({ path: "./.env" });
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 4000;

// mongoose.connect("mongodb://localhost:27017/nimble_nexus", {
// 	useNewUrlParser: true,
// });
// const db = mongoose.connection;
// db.on("error", (error) => console.error(error));
// db.once("open", () => console.log("Connected to Database"));

//template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use("", require("./routes/routes.js"));

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

app.listen(port, function () {
	console.log(`Server is running on http://localhost:${port}`);
});
