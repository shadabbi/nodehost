const express = require("express");

const notificationController = require("../controller/notification");

const router = express.Router();

router.get("/add-notification", notificationController.getAddNotification);
router.post("/add-notification", notificationController.postNotification);

router.get("/upload", notificationController.getUpload);
router.post("/upload", notificationController.postUpload);
router.get("/add-courses", notificationController.getAddCourses);
router.post("/add-courses", notificationController.postCourse);

module.exports = router;
