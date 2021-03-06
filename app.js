const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var session = require("express-session");
var multer = require("multer");
var MongoDBStore = require("connect-mongodb-session")(session);
var csrf = require("csurf");
var flash = require("connect-flash");

const protection = csrf();

const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const auth = require("./middelware/auth");

const MONGO_URI =
  "mongodb+srv://shadab:7011591907@cluster0.jzccf.mongodb.net/notification?retryWrites=true&w=majority";

const app = express();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "images"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

app.use(multer({ storage: storage }).array("image", 10));

var store = new MongoDBStore({
  uri: MONGO_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(express.static(path.join(__dirname, ".", "public")));
app.use(express.static(path.join(__dirname, "images")));

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(protection);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use("/admin", auth, adminRouter);

app.use(userRouter);

app.use((req, res, next) => {
  res.status(404).render("user/404.ejs", {
    title: "404",
    path: "/add-notification",
  });
});

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000);
    // app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });
