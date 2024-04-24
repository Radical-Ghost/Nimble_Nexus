const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
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
			newname: req.file.filename,
		});

		await newUpload.save();

		const newNotice = new Notice({
			title: req.body.title,
			desc: req.body.desc,
			department: req.body.department,
			author_ID: req.session.userId,
			author_name: req.session.userName,
			imageId: newUpload._id.toString(),
		});

		newNotice.save();

		const no_notices = await Notice.countDocuments();
		const all_users = await User.find({});
		const queries = await Notice.find({});
		res.render("admin", {
			title: "Admin",
			notices: no_notices,
			users: all_users,
			isAdmin: req.session.isAdmin,
			queries: queries,
		});
	} catch (err) {
		console.error("Error:", err);
	}
});

router.get("/uploads/:imageId", async (req, res) => {
	try {
		const upload = await Upload.findById(req.params.imageId);
		res.sendFile(path.join(__dirname, "../../uploads", upload.newname));
	} catch (err) {
		console.error("Error:", err);
		res.status(500).send("An error occurred while retrieving the image");
	}
});

module.exports = router;
