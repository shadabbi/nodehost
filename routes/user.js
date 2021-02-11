const express = require("express");
path = require("path");

path.join(__dirname, "myfile.mp3");

const router = express.Router();

router.get("/contact", (req, res, next) => {
  res.render("contact", { title: "contact" });
});
router.get("/", (req, res, next) => {
  res.render("index", { title: "home" });
});

module.exports = router;