const mongoose = require("mongoose");

const fileName = new mongoose.Schema({
	originalname: String,
	destination: String,
	newname: String,
});

module.exports = mongoose.model("Upload", fileName);
