const { name } = require("ejs");
const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	parentReplyId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Query",
	},
	text: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	likes: {
		type: Number,
		default: 0,
	},
	replies: [this],
});

const querySchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	noticeId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Notice",
	},
	title: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	likes: {
		type: Number,
		default: 0,
	},
	replies: [replySchema],
});

module.exports = mongoose.model("Query", querySchema);
