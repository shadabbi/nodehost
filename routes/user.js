const express = require("express");
path = require("path");

const authController = require("../controller/auth");
const notificationController = require("../controller/notification");
const Notification = require("../model/notification");

path.join(__dirname, "myfile.mp3");

const router = express.Router();

router.get("/contact", (req, res, next) => {
  console.log(req.session.test);
  res.render("user/contact", { title: "contact" });
});

router.get("/notification", notificationController.getNotifications);
router.get("/gellary", notificationController.getGellary);
router.get("/courses", notificationController.getCourses);

router.get("/", (req, res, next) => {
  Notification.find().then((result) => {
    res.render("user/index", {
      title: "home",
      notifications: result,
    });
  });
});

router.post("/sendMail", authController.sandMail);

module.exports = router;
