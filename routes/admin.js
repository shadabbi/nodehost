const express = require("express");

const notificationController = require("../controller/notification");

const router = express.Router();

router.get("/add-notification", notificationController.getAddNotification);
router.post("/add-notification", notificationController.getPostNotification);
router.get("/getNotifications", notificationController.getNotifications);

module.exports = router;
