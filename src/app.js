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

app.listen(port, function () {
	console.log(`Server is running on http://localhost:${port}`);
});
