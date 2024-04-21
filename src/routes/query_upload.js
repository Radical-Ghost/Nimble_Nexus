const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Query } = require("../models/query");
const { Reply } = require("../models/query");

router.post(
	"/upload_query/:noticeId/:noticeTitle/:noticeDep",
	async (req, res) => {
		try {
			const newQuery = new Query({
				userId: req.session.userId,
				userName: req.session.userName,
				noticeId: req.params.noticeId,
				title: req.body.title,
				desc: req.body.desc,
				noticeName: req.params.noticeTitle,
				noticeDep: req.params.noticeDep,
			});

			newQuery.save();

			const allQueries = await Query.find({});
			const allReplies = await Reply.find({});
			res.render("queries", {
				title: "Queries",
				isAdmin: req.session.isAdmin,
				queries: allQueries,
				replies: allReplies,
				queryId: req.params.queryId,
				noticeId: req.params.noticeId,
			});
		} catch (err) {
			console.error("Error:", err);
		}
	}
);

router.post("/upload_reply/:queryId", async (req, res) => {
	try {
		const query = await mongoose
			.model("Query")
			.findById(req.params.queryId);

		if (!query) {
			query = await mongoose
				.model("Query")
				.findOne({ "replies._id": ObjectId(req.params.queryId) });
			if (!query) {
				return res.status(404).send("Query not found");
			}
		}
		const reply = new Reply({
			userId: req.session.userId,
			userName: req.session.userName,
			parentReplyId: req.params.queryId,
			title: req.body.title,
			desc: req.body.desc,
		});

		query.replies.push(reply);

		await query.save();

		const allQueries = await Query.find({});
		const allReplies = await Reply.find({});
		res.render("queries", {
			title: "Queries",
			isAdmin: req.session.isAdmin,
			queries: allQueries,
			replies: allReplies,
			queryId: req.params.queryId,
			noticeId: req.params.noticeId,
		});
	} catch (err) {
		console.error("Error:", err);
	}
});

router.post("/like_query/:queryId", async (req, res) => {
	try {
		const query = await mongoose
			.model("Query")
			.findById(req.params.queryId);
		if (!query) {
			return res.status(404).send("Query not found");
		}

		query.likes += 1;

		await query.save();
	} catch (err) {
		console.error("Error:", err);
	}
});

router.post("/unlike_query/:queryId", async (req, res) => {
	try {
		const query = await mongoose
			.model("Query")
			.findById(req.params.queryId);
		if (!query) {
			return res.status(404).send("Query not found");
		}

		if (query.likes > 0) {
			query.likes -= 1;
		}

		await query.save();
	} catch (err) {
		console.error("Error:", err);
	}
});

module.exports = router;
