const mongoose = require("mongoose");
const querySchema = require("./query");

const noticeSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	desc: {
		type: String,
		required: true,
	},
	dep: {
		type: String,
	},
	creation_date: {
		type: Date,
		default: Date.now,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	imageId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Upload",
		required: true,
	},
});

module.exports = mongoose.model("Notice", noticeSchema);
