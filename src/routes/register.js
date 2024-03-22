const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const session = require("express-session");
const MongoDBsession = require("connect-mongodb-session")(session);
const User = require("../models/user");

router.post("/register", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });

		if (user) {
			return res.status(400).send({ error: "That user already exists!" });
		} else {
			const pass = req.body.password;
			const cPass = req.body.cPassword;
			if (pass != cPass) {
				return res
					.status(400)
					.send({ error: "Passwords do not match!" });
			} else {
				const newUser = new User({
					name: req.body.fullName,
					ID: req.body.ID,
					email: req.body.email,
					phoneNumber: req.body.phone,
					password: pass,
					gender: req.body.gender || "other",
				});
				await newUser.save();
				res.status(200).render("department", {
					title: "Home",
					message: "Registration successful!",
				});
			}
		}
	} catch (err) {
		console.error(err);
		res.status(500).send({ error: err.message });
	}
});

module.exports = router;
