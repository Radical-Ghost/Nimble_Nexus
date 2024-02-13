const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (user) {
			const isPasswordMatch = user.password === req.body.password;
			if (isPasswordMatch) {
				res.render("home", { title: "Home" });
			} else {
				res.status(400).send({ error: "Invalid credentials" });
			}
		} else {
			res.status(400).send({ error: "User not found" });
		}
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

module.exports = router;
