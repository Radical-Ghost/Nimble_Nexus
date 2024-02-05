const mongoose = req("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	create: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

module.exports = mongoose.model("User", userSchema);
