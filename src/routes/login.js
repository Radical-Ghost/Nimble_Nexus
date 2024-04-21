const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const notices = require("../models/notices");

router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			res.status(400).send({ error: "User not found" });
		} else {
			const isPasswordMatch = user.password === req.body.password;
			if (!isPasswordMatch) {
				res.status(400).send({ error: "Invalid credentials" });
			} else {
				req.session.userId = user._id;
				req.session.Auth = true;
				req.session.userName = user.name;
				req.session.isAdmin = user.admin;
				const sorted_notices = await notices
					.find()
					.sort({ creation_date: "desc" })
					.limit(10);
				res.render("department", {
					title: "Home",
					isAdmin: user.admin,
					notices: sorted_notices,
				});
			}
		}
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.get("/logout", (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			res.status(400).send("Unable to logout");
		} else {
			res.render("login", { title: "Login", isAdmin: false });
		}
	});
});

module.exports = router;
