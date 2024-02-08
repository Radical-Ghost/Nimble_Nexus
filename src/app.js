require("dotenv").config({ path: "./.env" });
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 4000;

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage: storage });

app.post("/upload", upload.single("notice"), (req, res) => {
	res.render("home", {
		title: "Home",
		message: "File was uploaded successfully!!" || "Default message",
	});
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use("", require("./routes/routes.js"));

app.listen(port, function () {
	console.log(`Server is running on http://localhost:${port}`);
});
