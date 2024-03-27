const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const MongoDBsession = require("connect-mongodb-session")(session);
const router = express.Router();

const app = express();
const port = process.env.PORT || 4000;
const URI = "mongodb://localhost:27017/nimble_nexus";
mongoose.connect(URI);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const store = new MongoDBsession({
	uri: URI,
	collection: "sessions",
});

app.use(
	session({
		secret: "secret key",
		resave: false,
		saveUninitialized: false,
		store: store,
		userID: null,
		username: null,
	})
);

app.use(
	require("./routes/routes.js"),
	require("./routes/notice_upload"),
	require("./routes/register.js"),
	require("./routes/login.js")
);

app.listen(port, function () {
	console.log(`Server is running on http://localhost:${port}`);
});
