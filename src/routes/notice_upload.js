const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const Notice = require("../models/notices");
const Upload = require("../models/notice_file");
const User = require("../models/user");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		cb(
			null,
			new Date().toISOString().replace(/:/g, "-") +
				"-" +
				file.originalname
		);
	},
});

const upload = multer({ storage: storage });

router.post("/upload_notice", upload.single("notice"), async (req, res) => {
	try {
		const newUpload = new Upload({
			originalname: req.file.originalname,
			destination: req.file.destination,
		});

		await newUpload.save();

		const newNotice = new Notice({
			title: req.body.title,
			desc: req.body.desc,
			department: req.body.department,
			author_ID: req.session.userID,
			author_name: req.session.username,
			imageId: newUpload._id.toString(),
		});

		newNotice.save();

		res.render("department", {
			title: "Home",
			isAdmin: req.isAdmin,
		});
	} catch (err) {
		console.error("Error:", err);
	}
});

module.exports = router;
