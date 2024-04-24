const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/update_user", async (req, res) => {
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

module.exports = router;
