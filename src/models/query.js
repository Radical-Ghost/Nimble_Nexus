const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
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

module.exports = mongoose.model("Query", querySchema);
