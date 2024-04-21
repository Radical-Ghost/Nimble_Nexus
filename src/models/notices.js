const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	desc: {
		type: String,
		required: true,
	},
	department: {
		type: String,
		required: true,
	},
	creation_date: {
		type: Date,
		default: Date.now,
	},
	author_ID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "sessions",
		required: true,
	},
	author_name: {
		type: String,
		ref: "User",
		required: true,
	},
	imageId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Upload",
		required: true,
	},
});

module.exports = mongoose.model("Notice", noticeSchema);
