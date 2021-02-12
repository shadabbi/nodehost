const Notification = require("../model/notification");

exports.getAddNotification = (req, res, next) => {
  res.render("admin/add-notification", {
    title: "notification",
    path: "/add-notification",
  });
};

exports.getPostNotification = (req, res) => {
  const notification = new Notification({ notice: req.body.notice });
  notification.save().then((result) => {
    res.redirect("/admin/getNotifications");
  });
};
exports.getNotifications = (req, res) => {
  Notification.find().then((result) => {
    res.render("admin/getNotifications.ejs", {
      allNotice: result,
    });
  });
};
