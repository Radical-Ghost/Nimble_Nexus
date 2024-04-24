const express = require("express");
const router = express.Router();
const notices = require("../models/notices");
const User = require("../models/user");
const { Query } = require("../models/query");
const { Reply } = require("../models/query");

const routes = [
	{ path: "/", view: "department", title: "Home" },
	{ path: "/notice", view: "notice", title: "Notice" },
	{ path: "/queries", view: "queries", title: "Queries" },
	{ path: "/about", view: "about", title: "About" },
	{ path: "/admin", view: "admin", title: "Admin" },
	{ path: "/login", view: "login", title: "Login" },
	{ path: "/signup", view: "signup", title: "Signup" },
	{ path: "/dashboard", view: "dashboard", title: "Dashboard" },
	{ path: "/cs", view: "departments/cs", title: "Computer Engineering" },
	{ path: "/aids", view: "departments/aids", title: "AI & DS" },
	{ path: "/extc", view: "departments/extc", title: "Electronics" },
	{ path: "/fe", view: "departments/fe", title: "First Year" },
	{ path: "/it", view: "departments/it", title: "Information Technology" },
	{ path: "/mech", view: "departments/mech", title: "Mechanical" },
	{ path: "/acc", view: "departments/acc", title: "Accounts" },
	{ path: "/lib", view: "departments/lib", title: "Library" },
	{ path: "/upload_notice", view: "upload_notice", title: "Upload Notice" },
	{
		path: "/upload_query/:noticeId/:noticeTitle/:noticeDep",
		view: "upload_query",
		title: "Upload Query",
	},
	{
		path: "/upload_reply/:queryId",
		view: "upload_reply",
		title: "Upload Reply",
	},
];

const redirectLogin = (req, res, next) => {
	if (!req.session.userId && req.url !== "/login" && req.url !== "/signup") {
		res.render("login", { title: "Login", isAdmin: req.session.isAdmin });
	} else {
		next();
	}
};

routes.forEach((route) => {
	router.get(route.path, redirectLogin, async (req, res) => {
		if (
			route.path === "/notice" ||
			route.path === "/cs" ||
			route.path === "/aids" ||
			route.path === "/extc" ||
			route.path === "/fe" ||
			route.path === "/it" ||
			route.path === "/mech" ||
			route.path === "/acc" ||
			route.path === "/lib"
		) {
			const allNotices = await notices.find({});
			res.render(route.view, {
				title: route.title,
				notices: allNotices,
				isAdmin: req.session.isAdmin,
			});
		} else if (route.path === "/") {
			const sorted_notices = await notices
				.find()
				.sort({ creation_date: "desc" })
				.limit(10);
			res.render(route.view, {
				title: route.title,
				notices: sorted_notices,
				isAdmin: req.session.isAdmin,
			});
		} else if (route.path === "/admin") {
			const no_notices = await notices.countDocuments();
			const all_users = await User.find({});
			const all_queries = await Query.find({});
			res.render(route.view, {
				title: route.title,
				notices: no_notices,
				users: all_users,
				isAdmin: req.session.isAdmin,
				queries: all_queries,
			});
		} else if (
			route.path === "/queries" ||
			route.path === "/dashboard" ||
			route.path === "/upload_query/:noticeId/:noticeTitle/:noticeDep" ||
			route.path === "/upload_reply/:queryId"
		) {
			const selected_notice = await notices.findOne({
				_id: req.params.noticeId,
			});
			const selected_query = await Query.findOne({
				_id: req.params.queryId,
			});
			const currentUser = await User.findOne({ _id: req.session.userId });
			const allQueries = await Query.find({});
			const allReplies = await Reply.find({});
			res.render(route.view, {
				title: route.title,
				isAdmin: req.session.isAdmin,
				queries: allQueries,
				replies: allReplies,
				queryId: req.params.queryId,
				noticeId: req.params.noticeId,
				noticeName: req.params.noticeTitle,
				noticeDep: req.params.noticeDep,
				userId: req.session.userId,
				selected_notice: selected_notice,
				selected_query: selected_query,
				currentUser: currentUser,
			});
		} else {
			res.render(route.view, {
				title: route.title,
				isAdmin: req.session.isAdmin,
			});
		}
	});
});

module.exports = router;
