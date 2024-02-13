const mongoose = require("mongoose");
const querySchema = require("./query");

const noticeSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
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
		required: true,
	},
	creation_date: {
		type: Date,
		default: Date.now,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	imageId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Upload",
		required: true,
	},
	queries: [querySchema],
});

module.exports = mongoose.model("Notice", noticeSchema);
