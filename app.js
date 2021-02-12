const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const shopRouter = require("./routes/user");
const adminRouter = require("./routes/admin");

const app = express();

app.use(express.static(path.join(__dirname, ".", "public")));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRouter);

app.use(shopRouter);

app.use((req, res, next) => {
  res.status(404).render("user/404.ejs", {
    title: "404",
    path: "/add-notification",
  });
});

mongoose
  .connect(
    "mongodb+srv://shadab:7011591907@cluster0.jzccf.mongodb.net/notification?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

// app.listen(process.env.PORT);
