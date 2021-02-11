const express = require("express");
const path = require("path");

const shopRouter = require("./routes/user");

const app = express();

app.use(express.static(path.join(__dirname, ".", "public")));
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(shopRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, ".", "views", "404.html"));
});

app.listen(3000);
