const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	admin: {
		type: Boolean,
		default: false,
	},
	ID: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	phoneNumber: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
	},
	dob: {
		type: Date,
	},
	gender: {
		type: String,
		default: "Not Specified",
	},
	casteCategory: {
		type: String,
	},
	academicYear: {
		type: String,
		default: "000",
	},
	department: {
		type: String,
		default: "Not Specified",
	},
});

module.exports = mongoose.model("User", userSchema);
