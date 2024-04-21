const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "sessions",
	},
	userName: {
		type: String,
		required: true,
	},
	parentReplyId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Query",
	},
	desc: {
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
	},
	userName: {
		type: String,
		required: true,
	},
	noticeId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	noticeName: {
		type: String,
		required: true,
	},
	noticeDep: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	desc: {
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

module.exports.Query = mongoose.model("Query", querySchema);
module.exports.Reply = mongoose.model("Reply", replySchema);
