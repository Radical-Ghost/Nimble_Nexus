const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const uploads = require("../models/notice_file");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/notices/");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage: storage });

router.post("/upload", upload.single("notice"), (req, res) => {
	res.render("home", {
		title: "Home",
		message: "File was uploaded successfully!!" || "Default message",
	});

	const newFile = new uploads({
		originalname: req.file.originalname,
		destination: path.join(
			path.dirname(__dirname),
			req.file.destination,
			req.file.originalname
		),
	});

	newFile
		.save()
		.then(() => console.log("File data saved to database"))
		.catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
